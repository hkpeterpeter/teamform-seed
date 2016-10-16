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

let firebaseService = firebase.initializeApp({
    serviceAccount: './firebase-service.json',
    databaseURL: CONFIG.FIREBASE_DATABASE
}, 'service');

let firebaseClient = firebase.initializeApp({
    apiKey: CONFIG.FIREBASE_API_KEY,
    databaseURL: CONFIG.FIREBASE_DATABASE
}, 'client');

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
                        var itsc = result.serviceresponse.authenticationsuccess.user;
                        firebaseService.database().ref('users').orderByChild('itsc').startAt(itsc).endAt(itsc).once('value', (snap) => {
                            var user = snap.val();
                            if(!user) {
                                firebaseClient.auth().createUserWithEmailAndPassword(itsc+'@ust.hk', randomstring.generate(12)).then((result) => {
                                    firebaseClient.auth().signOut();
                                    firebaseService.database().ref('users/'+result.uid).update({itsc: itsc});
                                    return resolve({token: firebaseService.auth().createCustomToken(result.uid)});
                                }).catch((error) => {
                                    return reject(error);
                                });
                            } else {
                                return resolve({token: firebaseService.auth().createCustomToken(snap.key)});
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

app.listen(process.env.PORT || 80);
