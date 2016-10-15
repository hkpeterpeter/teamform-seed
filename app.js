const path = require('path');
const firebase = require('firebase');
const compression = require('compression');
const express = require('express');

let app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.listen(process.env.PORT || 80);
