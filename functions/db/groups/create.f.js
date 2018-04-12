// HTTP Request from app
//
// function CreateGroup (group) do
//     if addGroupToDB(group) == success do
//         addGroupToUserHistoryGroups(group.ID)
//         increaseSubjectFrequency(group.subject)
//         return success
//     else
//         return error adding group to db
//     end
// end

const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.https.onRequest((req, res) => {
    const value = req.body.group;

    let groupURL = admin.database().ref('/groups').push(value).toString();

    let groupId = groupURL.substr(groupURL.lastIndexOf('/') + 1);

    res.send(groupId);

    let path = '/users/' + value.owner + '/GroupHistory/';

    let GroupHistoryObj = {
        timeJoined : "today"
    };

    admin.database().ref(path).child(groupId).set(GroupHistoryObj);
});
