const functions = require('firebase-functions');
const admin = require('../../../admin');
const utils = require('../utils');

exports = module.exports = functions.database.ref('/groups/{groupId}/members/{userId}').onCreate((change, context) => {
    let groupId = context.params.groupId;
    let userId = context.params.userId;
    let numOfMemberPath = '/groups/' + groupId + '/numberOfMembers';

    utils.increaseFrequency(numOfMemberPath);

    return utils.updateUserGroupHistory(userId, groupId);
});
