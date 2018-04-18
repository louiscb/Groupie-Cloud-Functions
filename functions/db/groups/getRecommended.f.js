const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.https.onRequest((req, res) => {
    let numOfGroups = 3;

    //shitty way to do it, need to do it better
    return utils.getRecentPublicGroups(numOfGroups).then(function(data) {
        return res.send(data);
    });
});