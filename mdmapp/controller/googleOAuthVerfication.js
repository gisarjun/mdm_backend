var { OAuth2Client } = require('google-auth-library');

module.exports = function(token, clientId, clientSecret) {
    return new Promise(function(resolve, reject) {
        try {
            var client = new OAuth2Client(clientId, clientSecret, '');
            var sentToken = {};
            sentToken.idToken = token;
            sentToken.audience = clientId;

            client.verifyIdToken(sentToken, function(error, login) {
                try {
                    if (error) {
                        resolve({ status: false, message: error });
                    } else {
                        resolve({ status: true, data: login.getPayload() });
                    }
                } catch (err) {
                    resolve({ status: false, message: err });
                }
            });

        } catch (error) {
            resolve({ status: false, message: error });
        }

    });
};