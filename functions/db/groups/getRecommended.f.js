const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.https.onCall((data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');

    let numOfGroups = 3;

    //shitty way to do it, need to do it better as only return 3 latest groups
    return utils.getRecentPublicGroups(numOfGroups).then(function(groups) {
        //Because something is dumb
        return JSON.stringify(groups);
    });
});