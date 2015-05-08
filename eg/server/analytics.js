var exports = module.exports = {};
exports.ga = function() {
	var results;
var googleapis = require('googleapis'),
    JWT = googleapis.auth.JWT,
    analytics = googleapis.analytics('v3');

var SERVICE_ACCOUNT_EMAIL = '554227395087-6jrv8jqvup6hvk3o3shheompuo0btlm5@developer.gserviceaccount.com';
var SERVICE_ACCOUNT_KEY_FILE = __dirname + '/key.pem';


var authClient = new JWT(
    SERVICE_ACCOUNT_EMAIL,
    SERVICE_ACCOUNT_KEY_FILE,
    null,
    ['https://www.googleapis.com/auth/analytics']
);

authClient.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    }

    analytics.data.realtime.get({ 
        auth: authClient,
        'ids': 'ga:72074530',
        'start-date': '2013-01-19',
        'end-date': '2015-02-20',
        'metrics': 'rt:activeUsers',
    }, function(err, result) {

	    results = result;
    });
});
	console.log(results);
return results;
};