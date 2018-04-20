const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.https.onCall((data, context) => {
    if (!context.auth)
       throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');

    let profile = data;

    if (profile.studyLocation === null) {
        profile.studyLocation = 'Stockholm, Sweden';
    }

    let userId = context.auth.uid;
    let user = {};
    user.profile = profile;
    context.instanceIdToken;

    return admin.database().ref('/users').child(userId).set(user).then((value) => {
        return { text : 'success ' + userId };
        //what do we want to return?
    });
});