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
    let path = 'groups/' + groupId + '/members';
    let member = { [userId] : true };

    //ONLY IF PUBLIC AND MAX MEMBERS NOT MET
    return admin.database().ref(path).update(member).then((snapshot) => {
        return res.send('success');
    });
});