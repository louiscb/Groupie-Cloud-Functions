const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.https.onCall((data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');

    let userId = context.auth.uid;
    let groupId = data;
    let groupPath = '/groups/' + groupId;

    return admin.database().ref(groupPath).once('value').then(function (snapshot) {
        let group = snapshot.val();

        console.log('HELLO OVER HeRE ' + group.members.userId);

        //Check if user already member of group
        if (group.members[userId])
            throw new functions.https.HttpsError('resource-exhausted', 'You are already a member of the group');

        //ONLY IF PUBLIC AND MAX NUM MEMBERS NOT MET
        if (group.numberOfMembers < group.maxNumberOfMembers && group.isPublic) {
            utils.sendGroupNotification(userId, group.conversationId, "has joined the group.");

            let member = { [userId] : true };
            let membersPath = groupPath + '/members';

            return admin.database().ref(membersPath).update(member).then((snapshot) => {
                return "success";
            });
        } else {
            throw new functions.https.HttpsError('resource-exhausted', 'The requested group is private');
        }
    });
});