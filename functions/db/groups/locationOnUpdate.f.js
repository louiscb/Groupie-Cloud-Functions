const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.database.ref('/groups/{groupId}/location/').onUpdate((change, context) => {
    let message = 'The owner has the location of the meeting';
    console.log(message);
    //send notification to users that certain has been updated
});