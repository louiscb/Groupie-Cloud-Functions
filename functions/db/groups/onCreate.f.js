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

    utils.increaseFrequency(subjectPath + '/frequency/');

    //time stamp in unix time
    let timeStamp = utils.convertDateToUnix(group.dateOfMeeting);
    //create converstaion object
    let convo = {};
    convo.members = group.members;
    convo.creationDate = utils.getDate();

    let convoId = admin.database().ref('/conversations').push(convo).key;

    //Welcome message for creating group
    // let notification = {};
    // notification.senderUserId = 'notification';
    // notification.name = 'Someone';
    // notification.text = 'has created this new group';
    // let messagingPath = '/conversations/' + convoId + '/messages/';
    // admin.database().ref(messagingPath).push(notification);
    utils.sendGroupNotification(group.owner, convoId, 'created the group.');

    let updateObj = { conversationId : convoId, meetingDateTimeStamp : timeStamp };
    let path = 'groups/' + groupId;
    return admin.database().ref(path).update(updateObj);
});