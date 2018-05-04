const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.https.onCall((data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');

    let userId = context.auth.uid;
    let groupId = data;
    let groupPath = '/groups/' + groupId;

    console.log("USER ID " + userId);
    console.log("GROUP ID " + groupId);

    return admin.database().ref(groupPath).once('value').then(function (snapshot) {
        let group = snapshot.val();
        console.log(group);

        //ONLY IF PUBLIC AND MAX NUM MEMBERS NOT MET
        if (group.numberOfMembers < group.maxNumberOfMembers && group.isPublic) {
            let userPath = '/users/' + userId;

            return admin.database().ref(userPath).once('value').then(function (snapshot) {
                let user = snapshot.val();
                let notification = {};
                notification.senderUserId = 'notification';
                notification.name = user.profile.firstName;
                notification.text = 'has joined the group';
                let messagingPath = '/conversations/' + group.conversationId + '/messages/';
                admin.database().ref(messagingPath).push(notification);

                let member = { [userId] : true };
                let membersPath = groupPath + '/members';

                return admin.database().ref(membersPath).update(member).then((snapshot) => {
                    return "success";
                });
            });
        } else {
            throw new functions.https.HttpsError('resource-exhausted', 'The requested group is private');
        }
    });
});