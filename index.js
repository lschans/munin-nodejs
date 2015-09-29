var Hapi = require('hapi');

var Bcrypt = require('bcrypt');

var users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

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

server.connection({ port: 9080 });

server.register([require('inert'), require('hapi-auth-basic')], function (err) {

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({ method: 'GET', path: '/', config: { auth: 'simple' } });

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '/var/www/munin'
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