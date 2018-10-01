const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.database.ref('/groups/{groupId}/owner/').onUpdate((change, context) => {
    let message = 'is the new owner.';

    //send notification to users that certain has been updated
    return admin.database().ref('groups').child(context.params.groupId).once('value').then(function (snapshot) {
        const group = snapshot.val();
        utils.sendGroupNotification(group.owner, group.conversationId, message);
        return ('success');
    });
});