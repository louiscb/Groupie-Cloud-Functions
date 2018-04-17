const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.https.onRequest((req, res) => {
    let groupId = req.body.groupId;
    let userId = req.body.userId;
    let path = 'groups/' + groupId + '/members/' + userId;

    return admin.database().ref(path).remove().then((snapshot) => {
        return res.send('success');
    });

    //triggers for when a user leaves a group are in members/onDelete
});