const functions = require('firebase-functions');
const admin = require('../../../admin');
const utils = require('../utils');

exports = module.exports = functions.database.ref('/groups/{groupId}/members/{userId}').onCreate((change, context) => {
    let groupId = context.params.groupId;
    let userId = context.params.userId;
    let groupPath = '/groups/' + groupId;
    let numOfMemberPath = groupPath + '/numberOfMembers';

    utils.increaseFrequency(numOfMemberPath);
    utils.updateUserGroupHistory(userId, groupId);

    return admin.database().ref(groupPath).once('value', (snapshot) => {
        let group = snapshot.val();
        let convoPath = '/conversations/' + group.conversationId + '/members';
        return admin.database().ref(convoPath).update(group.members);
    });
});
