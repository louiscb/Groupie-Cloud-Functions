// // send group get related active group if any
// HTTP Request from app
//
// function Join (GroupID, UserID) do
//   if !request.user == UserID
//     return error you are not this user
//
//   group = getGroupFromDB
//
//   if group.numberOfMembers < group.maxnumofmembers & group.isActive
//     group.members add UserID
//     user.groups add GroupID
//     notificationNewMember(GroupID)
//   end
// end
const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.https.onRequest((req, res) => {
    let groupId = req.body.groupId;
    let userId = req.body.userId;
    let groupPath = '/groups/' + groupId ;

    //ONLY IF PUBLIC AND MAX MEMBERS NOT MET
    return admin.database().ref(groupPath).once('value', (snapshot) => {
        let group = snapshot.val();

        if (group.numberOfMembers < group.maxNumberOfMembers) {
            let member = { [userId] : true };
            let membersPath = groupPath + '/members';
            return admin.database().ref(membersPath).update(member).then((snapshot) => {
                return res.send('success');
            });
        } else {
            return res.status(403).send('This group is full!');
        }
    });
});