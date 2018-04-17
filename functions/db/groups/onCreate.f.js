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
        updateFreq(topicPath);
    }

    return updateFreq(subjectPath + '/frequency/');
});

// function updateUserGroupHistory(userId, groupId) {
//     let userGroupsPath = '/users/' + userId + '/groupHistory/';
//     let date = new Date();
//     let groupHistoryObj = {
//         timeJoined: date.getUTCDate().toString()
//     };
//
//     return admin.database().ref(userGroupsPath).child(groupId).set(groupHistoryObj);
// }

function updateFreq(path) {
    return admin.database().ref(path).once('value', (snapshot) => {
        let freq = snapshot.val();
        freq++;
        return admin.database().ref(path).set(freq);
    });
}