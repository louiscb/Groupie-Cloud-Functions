const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.database.ref('/groups/{groupId}/description/').onUpdate((change, context) => {
    let message = 'has updated the description';

    //send notification to users that certain has been updated
    return admin.database().ref('groups').child(groupId).once('value').then(function (snapshot) {
        const group = snapshot.val();
        utils.sendGroupNotification(group.owner, group.conversationId, message);
        return ('success');
    });
});