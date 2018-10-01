// // send group get related active group if any
// HTTP Request from app
//
// function GetPrivate (UserID) do
//   if (Request.User !== UserID)
//     return you not the user
//
//   Profile = getPrfile(UserID)
//
//   Return profile
//
//   //maybe do this on the clients app?
//   //which is faster?
//   //we could organise the lists with other factors to do with the user
// end

const functions = require('firebase-functions');
const admin = require('../../../admin');

exports = module.exports = functions.https.onRequest((req, res) => {
    let userId = req.body.userId;
    let path = '/users/' + userId + '/profile';

    return admin.database().ref(path).once('value', (snapshot) => {
      return res.send(snapshot.val());
    })
});