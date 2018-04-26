const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.https.onCall((data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');

    let groupId = data;
    let userId = context.auth.uid;
    let path = 'groups/' + groupId;
    console.log("group id " + groupId);
    console.log("user id " + userId);

    return admin.database().ref(path).once('value').then(function (snapshot) {
        let group = snapshot.val();
        let isPublicPath = path + '/isPublic';
        let isPublic;
        console.log(utils.getDate());

        //only group owner and group not past the meeting date can become public
        if (group.owner.toString() === userId.toString()) {
            let currentDate = utils.getDate();

            if (group.isPublic) {
                isPublic = false;
            } else {
                if (utils.convertDateToUnix(currentDate) < utils.convertDateToUnix(group.dateOfMeeting)) {
                    isPublic = true;
                } else {
                    console.log("CURRENT " + utils.convertDateToUnix(currentDate));
                    console.log("GROUP " + utils.convertDateToUnix(group.dateOfMeeting));
                    console.log('You need to set a new meeting date');
                    return ('You need to set a new meeting date');
                }
            }
            admin.database().ref(isPublicPath).set(isPublic);
            console.log('isPublic is now: ' + isPublic);

            return ('isPublic is now: ' + isPublic);
        } else {
            console.log('You are not the owner');
            return ('You are not the owner');
        }
    });
});

