// // send group get related active group if any
// HTTP Request from app
//
// function Create (User) do
//   if (formatOKay(User))
//     addUser(User)
//     sendWelcomeEmail(User)
// end
const functions = require('firebase-functions');
const admin = require('../../admin');

//admin.auth().current