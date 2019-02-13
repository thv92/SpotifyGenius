const express = require('express');
const path = require('path');
const cors = require('cors');
const proxyMiddleware = require('http-proxy-middleware');
const port = process.env.PORT ? process.env.PORT : 8080;
const host = process.env.HOST ? process.env.HOST : '0.0.0.0';
const webpack = require('webpack');
const config = require('../../webpack.config.prod.js')(process.env);
const app = express();
const compiler = webpack(config);

function log(req, res, next) {
    console.log('Incoming request: ');
    console.log(req.headers);
    console.log('Incoming response: ');
    console.log(res.headers);
    next();
}

app
.use(cors({
    credentials: true
}))
.use('/api', proxyMiddleware('/api', { 
    target: process.env.API_URL,
    pathRewrite: {'^/api': ''},
    logLevel: 'info',
    secure: true,
    changeOrigin: true,
}))
.use(log).use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res, next) => {
    const filename = path.resolve(compiler.outputPath, 'index.html');
    compiler.inputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err);
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});


console.log('Listening on: ' + host + ':' + port);
app.listen(port, host);