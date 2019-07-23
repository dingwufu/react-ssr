import render from './render';
import proxy from 'express-http-proxy';
let express = require('express');
let app = express();
app.use(express.static('public'));
// api开头代理服务器处理
app.use('/api', proxy('http://127.0.0.1:4000', {
    proxyReqPathResolver(req) {
        return `/api${req.url}`;
    }
}));

app.get('*', function (req, res) {
    render(req, res);
});
app.listen(3000, function () {
    console.log('server started at port 3000');
});