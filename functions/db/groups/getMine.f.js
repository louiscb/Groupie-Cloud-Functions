// // send group get related active group if any
// HTTP Request from app
//
// function GetMine (UserID) do
//   if (Request.UserID == UserID)
//     return getListGroupFromDB(UserID)
//   else {
//     return error you are not this user
//   }
//   //maybe do this on the clients app?
//   //which is faster?
//   //we could organise the lists with other factors to do with the user
// end
const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.https.onRequest((req, res) => {
    let userId = req.body.userId;
    console.log(userId);
    let path = '/users/' + userId + '/groupHistory';

    return admin.database().ref(path).once('value', (snapshot) => {
        if (snapshot.hasChildren()) {
            let groups = snapshot.val();
            return res.send(groups);
        } else {
            return res.send("null");
        }
    });
});