/**
 *  HTTP Command to leave a group
 *
 *  Triggers for when a user leaves a group are in 'members/onDelete'
 *
 */

const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.https.onCall((data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');

    let groupId = data;
    let userId = context.auth.uid;
    let path = 'groups/' + groupId + '/members/' + userId;

    return admin.database().ref(path).remove().then((snapshot) => {
        return admin.database().ref('groups').child(groupId).once('value').then(function (snapshot) {
            utils.sendGroupNotification(userId, snapshot.val().conversationId, "has left the group.");
            return ('success');
        });
    });
});