const functions = require('firebase-functions');
const admin = require('../../admin');

exports = module.exports = functions.database.ref('/groups/{groupId}/description/').onUpdate((change, context) => {
    let message = 'The owner has changed the description';
    console.log(message);
    //send notification to users that certain has been updated
});