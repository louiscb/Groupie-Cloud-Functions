/**
 *
 * THIS FUNCTION SHOULD BE CALLED AT MIDNIGHT EVERYDAY TO CHECK ALL GROUPS AND SEE IF ANY NEED TO BE CONVERTED TO PRIVATE
 */

const functions = require('firebase-functions');
const admin = require('../../admin');
const utils = require('./utils');

exports = module.exports = functions.https.onRequest((req, res) => {
    return utils.getRecentPublicGroups(false).then(function(data) {
        let currentDate = utils.getDate();
        let groups = data;
        console.log(groups);

        for (let i = 0; i < groups.length; i++) {
            let group = groups[i];
            console.log(group);
            //when date of meeting has already passed, we should change the group to private
            if (utils.convertToDateObj(currentDate) > utils.convertToDateObj(group.dateOfMeeting)) {
                let isPublicPath = '/groups/' + group.groupId + '/isPublic';
                admin.database().ref(isPublicPath).set(false);
                console.log('Converted ' + group.groupId + ' to private');
            }
        }

        return res.send('success');
    });
});