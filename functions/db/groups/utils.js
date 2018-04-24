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
    },

    getRecentPublicGroups: function(numOfGroups) {
        let path = '/groups/';
        let MAX_GROUP_AMOUNT = numOfGroups;

        //returning a promise. To access 'data' variable you have to enter the promise
        //similar to functional programming.
        //Read about here: https://blog.domenic.me/youre-missing-the-point-of-promises/
        return admin.database().ref(path).once('value').then(function (snapshot) {
//            let data = { groups : []};
            let data = [];


            if (snapshot.hasChildren()) {
                let groups = snapshot.val();
                let keys = Object.keys(groups);

                //If we want all of the public groups send null as parameter
                if (!numOfGroups)
                    MAX_GROUP_AMOUNT = keys.length;

                for (let i=keys.length-1; i > -1; i--) {
                    let key = keys[i];
                    let group = groups[key];

                    if (group.isPublic) {
                        group.groupId = key;
                        data.push(group);
                    }

                    //LIMIT THE MAX AMOUNT OF GROUPS WE WANT TO RECEIVE
                    if (i < keys.length-MAX_GROUP_AMOUNT)
                        break;
                }

                return data;
            } else {
                return null;
            }
        });
    },
    getDate : function () {
        return getDate();
    },
    //Takes a getDate formatted string and converts it into JS date object
    //allows you to compare dates like for seeing if it is past date of meeting
    convertToDateObj : function (date) {
        let parts = date.split("-");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    },
    convertDateToUnix : function (date) {
        date = date.split('-');
        let newDate=date[1]+"/"+date[0]+"/"+date[2];
        return Math.floor(new Date(newDate).getTime() / 1000)
    }
};

function getDate() {
    let date = new Date();
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    let dd  = date.getDate().toString();

    return (dd[1]?dd:"0"+dd[0]) + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + yyyy;
}
