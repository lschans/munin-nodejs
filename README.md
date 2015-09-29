# munin-nodejs
Munin server based on HAPI in nodejs

##Why?
Do you like munin for monitoring, but are you not so amused by the classic apache/nginx overhad that remembers you of the past? That's what we have munin-nodejs for. It's a really basic and simple HAPI server in nodejs that uses basic-auth and serves your munin root.

##How to use?
* Clone this repo in your /opt (or where ever you like to have it)
* Do an 'npm install' in the folder to install node modules
* Change the config on top of the index document to your wishes
* Use mkpasswd.js ('node mkpasswd.js MYEPICPASSWORD') to generate a password hash.
* Start the project using forever, nodemon, or as a service.
* Sit back and enjoy your stats with a lot less overhead.

