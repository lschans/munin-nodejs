var Hapi = require('hapi');
var Bcrypt = require('bcryptjs');

var config = {
    auth:true,
    muninPath:'/var/www/munin',
    port:9080,
    reqSSL: false
};

// Default user is admin with password admin
// use mkpasswd.js to generate a password hash
var users = {
    admin: {
        username: 'admin',
        password: '$2a$08$iXSSPmjSgraJeoge6oiHger7EEYIF7wdtd4H8StYy7TW3NHrsRpl6',   // 'secret'
        name: 'admin',
        id: '0'
    }
};

var hapiRegisterArr = [];

hapiRegisterArr.push(require('inert'));
if(config.auth) hapiRegisterArr.push(require('hapi-auth-basic'));
if(config.reqSSL) hapiRegisterArr.push(require('hapi-require-https'));

var validate = function (request, username, password, callback) {

    var user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {

        callback(err, isValid, { id: user.id, name: user.name });
    });
};

var server = new Hapi.Server();

server.connection({ port: config.port });

server.register(hapiRegisterArr, function (err) {
    if (err) {
        throw err;
    }

    if(config.auth) server.auth.strategy('simple', 'basic', { validateFunc: validate });

    server.route({
        method: 'GET',
        path: '/{param*}',
        config: { auth: 'simple' },
        handler: {
            directory: {
                path: config.muninPath
            }
        }
    });

    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
