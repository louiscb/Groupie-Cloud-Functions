const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.database.ref('/groups/{groupId}/maxNumOfMembers/').onUpdate((change, context) => {
    let message = 'The owner has changed the max number of members';
    console.log(message);
    //send notification to users that certain has been updated
});