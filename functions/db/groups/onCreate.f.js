const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.database.ref('/groups/{groupId}/').onCreate((change, context) => {
    let group = change.val();
    let groupId = change.key;

    //updateUserGroupHistory(group.owner, groupId);
    utils.updateUserGroupHistory(group.owner, groupId);

    let subjectPath = '/subjects/' + group.subject;

    if (group.topic) {
        let topicPath = subjectPath + '/topics/' + group.topic;
        utils.increaseFrequency(topicPath);
    }

    return utils.increaseFrequency(subjectPath + '/frequency/');
});