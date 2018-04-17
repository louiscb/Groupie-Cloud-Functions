// HTTP Request from app
//
// function ActivateGroup (GroupID, UserID) do
//     group = getGroupFromDB(GroupID)
//
//     if UserID == group.owner then
//         group.active = true
//         updateGroupDB(group)
//         //Should we have a main notification function where parameters are a groupID and a message
//         //and you notify all members of that group that message?
//         notifyGroup(GroupID, "this group is now active")
//         return success
//     else
//         return "user doesn't not have permissions"
//     end
// end
const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.https.onRequest((req, res) => {
    let groupId = req.body.groupId;
    let path = 'groups/' + groupId;

    return admin.database().ref(path).once('value', (snapshot) => {
        let group = snapshot.val();
        let isPublicPath = path + '/isPublic/';
        let isPublic;

        if (group.isPublic() === 'true') {
            isPublic = false;
            admin.database().ref(isPublicPath).set('false');
        } else {
            isPublic = true;
            admin.database().ref(isPublicPath).set('true');
        }

        return res.send(isPublic);
    });
});