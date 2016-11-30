const fs = require('fs');
const path = require('path');
const firebase = require('firebase');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const request = require('request');
const randomstring = require('randomstring');
const parseXML = require('xml2js').parseString;
const XMLprocessors = require('xml2js/lib/processors');
const CONFIG = require('./config.js');
const admin = require('firebase-admin');

let firebaseService = admin.initializeApp({
    credential: admin.credential.cert(require('./firebase-service.json')),
    databaseURL: CONFIG.FIREBASE_DATABASE
});

let firebaseClient = () => {
    return firebase.initializeApp({
        apiKey: CONFIG.FIREBASE_API_KEY,
        databaseURL: CONFIG.FIREBASE_DATABASE
    }, 'client');
};

let app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/oauth', (req, res) => {
    if (req.body.ticket && req.body.service_uri) {
        new Promise((resolve, reject) => {
            request.get({
                url: 'https://cas.ust.hk/cas/serviceValidate?ticket=' + req.body.ticket + '&service=' + req.body.service_uri
            }, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                parseXML(body, {
                    trim: true,
                    normalize: true,
                    explicitArray: false,
                    tagNameProcessors: [XMLprocessors.normalize, XMLprocessors.stripPrefix]
                }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    if (result.serviceresponse.authenticationfailure) {
                        return reject(new Error('CAS authentication failed (' + result.serviceresponse.authenticationfailure.$.code + ').'));
                    }
                    if (result.serviceresponse.authenticationsuccess) {
                        let itsc = result.serviceresponse.authenticationsuccess.user;
                        firebaseService.database().ref('users').orderByChild('itsc').startAt(itsc).endAt(itsc).once('value', (snap) => {
                            let user = snap.val();
                            if(!user) {
                                let client = firebaseClient();
                                client.auth().createUserWithEmailAndPassword(itsc+'@connect.ust.hk', randomstring.generate(12)).then((result) => {
                                    client.auth().signOut();
                                    firebaseService.database().ref('users/'+result.uid).update({itsc: itsc, email: itsc+'@connect.ust.hk', name: itsc, role: 'member', gender: 'M', createdAt: Date.now()});
                                    firebaseService.auth().createCustomToken(result.uid).then((token) => {
                                        return resolve({token: token});
                                    })
                                }).catch((error) => {
                                    return reject(error);
                                });
                            } else {
                                firebaseService.auth().createCustomToken(Object.keys(user)[0]).then((token) => {
                                    return resolve({token: token});
                                });
                            }
                        });
                    } else {
                        return reject(new Error('CAS authentication failed.'));
                    }
                });
            });
        }).then((result) => {
            res.json(result);
        }).catch((error) => {
            res.status(401).json({
                error: error
            });
        });
    } else {
        res.status(401).end();
    }
});

app.listen(process.env.PORT || 3000);
