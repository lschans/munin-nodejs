var Bcrypt = require('bcrypt');

if(typeof(process.argv[2]) == 'undefined') {
    console.log('mkpasswd requires password as argument');
} else {
    Bcrypt.hash(process.argv[2], 8, function(err, hash) {
        console.log('passwd hash: ' + hash);
    });
}