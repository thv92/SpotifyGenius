const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT ? process.env.PORT : 8080;
const host = process.env.HOST ? process.env.HOST : '0.0.0.0';
const app = express();

function log(req, res, next) {
    console.log('Incoming request: ');
    console.log(req.headers);
    console.log('Incoming response: ');
    console.log(res.headers);
    next();
}

app
.use(cors())
.use(log).use(express.static(path.join(__dirname, '../../dist')));

app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});


console.log('Listening on: ' + host + ':' + port);
app.listen(port, host);