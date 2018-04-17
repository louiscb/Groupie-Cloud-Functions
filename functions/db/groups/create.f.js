const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.https.onRequest((req, res) => {
    //Just for testing purposes, should be done via database
    const group = req.body.data;

    let groupURL = admin.database().ref('/groups').push(group).toString();
    let groupId = groupURL.substr(groupURL.lastIndexOf('/') + 1);

    res.send(groupId);
});
