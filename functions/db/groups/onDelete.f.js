const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.database.ref('/groups/{groupId}/').onDelete((change, context) => {
   const convoId = change.child('conversationId');
   console.log('conversation ' + convoId);
   return;
});