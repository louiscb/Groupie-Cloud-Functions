/**
 *
 * THIS FILE CONTAINS USEFUL FUNCTIONS REUSED THROUGHOUT GROUPS CLOUD FUNCTIONS
 *
 */

const functions = require('firebase-functions');
const admin = require('../../admin');

module.exports = {
    updateUserGroupHistory: function (userId, groupId) {
        let userGroupsPath = '/users/' + userId + '/groupHistory/';
        //let date = new Date();

        let groupHistoryObj = {
            dateJoined: getDate()
        };

        return admin.database().ref(userGroupsPath).child(groupId).set(groupHistoryObj);
    },

    increaseFrequency: function (path) {
        return admin.database().ref(path).once('value', (snapshot) => {
            let freq = snapshot.val();
            freq++;
            return admin.database().ref(path).set(freq);
        });
    },

    decreaseFrequency: function (path) {
        return admin.database().ref(path).once('value', (snapshot) => {
            let freq = snapshot.val();
            freq--;
            return admin.database().ref(path).set(freq);
        });
    }
};

function getDate() {
    let date = new Date();
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    let dd  = date.getDate().toString();

    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
}