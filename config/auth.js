// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '673430673118186', // your App ID
        'clientSecret'    : 'cfc10e720f2f338cd185cbbdf078b1d1', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileURL'      : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },

};
