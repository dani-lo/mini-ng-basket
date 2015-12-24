var connect = require('connect'),
	serveStatic = require('serve-static'),
	hello = require('./hello');

hello();

connect().use(serveStatic(__dirname)).listen(8080);
