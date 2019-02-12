const express = require('express');
const path = require('path');
const cors = require('cors');
const webpack = require('webpack');
const config = require('../../webpack.config.dev.js');

require('dotenv').load();

const port = process.env.PORT ? process.env.PORT : 8080;
const host = process.env.HOST ? process.env.HOST : '0.0.0.0';
const app = express();
const compiler = webpack(config);

//middlewares
const proxyMiddleware = require('http-proxy-middleware');
const wdsMiddleware = require('webpack-dev-middleware');
const hotMiddlware = require('webpack-hot-middleware')

app.use(express.static(path.join(__dirname, '../../dist')))
   .use(wdsMiddleware(compiler, {
       publicPath: config.output.publicPath
   }))
   .use(hotMiddlware(compiler))
   .use(cors())
   .use('/api', proxyMiddleware('/api', { 
        target: process.env.API_URL,
        pathRewrite: {'^/api': ''},
        logLevel: 'debug',
        secure: false,
        changeOrigin: true,
    }));


app.get('*', (req, res, next) => {
    const filename = path.resolve(compiler.outputPath, 'index.html');
    console.log(filename);
    console.log(req.cookies[process.env.STATE]);
    compiler.inputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err);
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});









console.log('Listening on: ' + host + ':' + port);
app.listen(port, host);