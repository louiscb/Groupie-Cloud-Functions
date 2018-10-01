const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.https.onCall((data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');

    const NUM_GROUPS_TO_SEND = 3;
    const userId = context.auth.uid;

    return admin.database().ref('/users').child(userId).once('value').then(function (snapshot) {
        let user = snapshot.val();

        return admin.database().ref('/groups').once('value').then(function (snapshot) {
            if (snapshot.hasChildren()) {
                let data = [];
                let groups = snapshot.val();
                let keys = Object.keys(groups);

                for (let i=keys.length-1; i > -1; i--) {
                    let key = keys[i];
                    let group = groups[key];

                    if (group.isPublic && group.members[userId] === undefined) {
                        if (data.length < NUM_GROUPS_TO_SEND) {
                            group.groupId = key;
                            data.push(group);
                        } else {
                            if (group.subject.toString() === user.profile.favoriteSubject.toString()) {
                                group.groupId = key;
                                data.push(group);
                            }
                        }
                    }

                    //LIMIT THE Number of GROUPS WE WANT TO iterate through
                    if (i < 1)
                        break;
                }

                // if (data.length !== NUM_GROUPS_TO_SEND) {
                //     let i = 0;
                //     while (data.length < NUM_GROUPS_TO_SEND || i > mostRecentGroups.length) {
                //         data.push(mostRecentGroups[i]);
                //     }
                // }

                data = data.slice(data.length-3, data.length);

                return JSON.stringify(data);
            } else {
                return null;
            }
        });
    });
});