const functions = require('firebase-functions');
const admin = require('../../../admin');

exports = module.exports = functions.https.onRequest((req, res) => {
    let userId = req.body.userId;
    let path = '/users/' + userId + '/profile';

    return admin.database().ref(path).once('value', (snapshot) => {
        let publicProfile = {};
        let profile = snapshot.val();

        publicProfile.userId = userId;
        publicProfile.firstName = profile.firstName;
        publicProfile.lastName = profile.lastName;
        publicProfile.profilePicture = profile.profilePicture;
        publicProfile.bio = profile.bio;
        publicProfile.school = profile.school;
        publicProfile.fieldOfMeeting = profile.fieldOfMeeting;

        return res.send(publicProfile);
    })
});