//Not neccesary as we don't need user delete function.
//Maybe when you delete put group in archive?

// const functions = require('firebase-functions');
// const admin = require('../../admin');
//
// exports = module.exports = functions.https.onRequest((req, res) => {
//     let groupId = req.body.groupId;
//     let path = 'groups/' + groupId;
//
//     return admin.database().ref(path).remove().then((snapshot) => {
//         return res.send('success');
//     });
// });