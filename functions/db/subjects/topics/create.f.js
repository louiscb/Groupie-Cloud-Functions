// // send group get related active group if any
// HTTP Request from app
//
// function Create (TopicName) do
//   topics = getTopics
//
//   if topics.contains(TopicName)
//     return error topic already exists
//
//   topics.addNew(TopicName, freq = 1)
// end

const functions = require('firebase-functions');
const admin = require('../../../admin');

exports = module.exports = functions.https.onCall((data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');

    let subject = data.subject;
    let topic = data.topic;
    topic.frequency = 0;

    let path = '/subjects/' + subject + '/topics/';

    return admin.database().ref(path).child(topic).set(topic).then((value) => {
        return {text: 'success'};
        //what do we want to return?
    });
});