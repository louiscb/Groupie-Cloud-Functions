const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.https.onRequest((req, res) => {
    let groupId = req.body.groupId;
    let userId = req.body.userId;
    let path = 'groups/' + groupId;

    return admin.database().ref(path).once('value', (snapshot) => {
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
                if (utils.convertToDateObj(currentDate) > utils.convertToDateObj(group.dateOfMeeting)) {
                    isPublic = true;
                } else {
                    return res.status(403).send('You need to set a new meeting date');
                }
            }
            admin.database().ref(isPublicPath).set(isPublic);
            return res.send('isPublic is now: ' + isPublic);
        } else {
            return res.status(403).send('You are not the owner');
        }
    });
});

