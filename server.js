var restify = require('restify');

var server = restify.createServer({
    name: 'Web Service',
    versions: ['1.0.0']
});
server.use(restify.gzipResponse());
server.use(restify.pre.userAgentConnection());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// static files: /, /index.html, /images...
server.get(/^\/((.*)(\.)(.+))*$/, restify.serveStatic({ directory: 'public', default: "index.html" }));

// testing the service
server.get('/test', function (req, res, next) {
    res.send("testing...");
    return next();
});
server.get('/test/:page', function (req, res, next) {
    res.send(req.params.page);
    return next();
});


server.listen(4000, function () {
    console.log('%s listening at %s', server.name, server.url);
});
