/**
 *
 * LOGIC FOR AFTER A USER HAS LEFT A GROUP. USER CANNOT EXPLICITLY DELETE GROUP, THE GROUP GETS AUTOMATICALLY DELETED WHEN THE LAST USER LEAVES
 *
 * User has already left group by this point. This is the aftermath.
 *
 */

const functions = require('firebase-functions');
const admin = require('../../../admin');
const utils = require('../utils');

exports = module.exports = functions.database.ref('/groups/{groupId}/members/{userId}').onDelete((change, context) => {
    let userId = change.key;
    let groupId = context.params.groupId;

    let numberOfMembersPath = '/groups/' + groupId + '/numberOfMembers';

    utils.decreaseFrequency(numberOfMembersPath);

    chooseNewOwner(userId, groupId);

    //Change group history of user who left

    let userPath = '/users/' + userId;
    let groupHistoryPath = userPath + '/groupHistory/' + groupId;
    admin.database().ref(groupHistoryPath).remove();

    let groupPath = '/groups/' + groupId;
    return admin.database().ref(groupPath).once('value', (snapshot) => {
        let group = snapshot.val();
        let convoPath = '/conversations/' + group.conversationId + '/members/' + userId;
        return admin.database().ref(convoPath).remove();
    });
});

function chooseNewOwner(userId, groupId) {
    let groupPath = '/groups/' + groupId;

    return admin.database().ref(groupPath).once('value', (snapshot) => {
        let group = snapshot.val();
        let members = group.members;

        if (snapshot.child('members').hasChildren()) {

            //if the user who left was the owner choose new owner from members list
            if (userId.toString() === group.owner.toString()) {

                let firstMember = Object.keys(members)[0]; // "a"

                let owner = { owner : firstMember };

                //change the owner of group
                return admin.database().ref(groupPath).update(owner).then((snapshot) => {
                    return notifyGroupMemberHasLeft(groupPath, "The owner has left. Long live the new owner");
                });
            }
        } else {
            //delete group as the last user left
            return admin.database().ref(groupPath).remove();
        }

        //notify group someone (not owner) has left group
        return notifyGroupMemberHasLeft(groupPath, "Someone has left the group");
    });
}

function notifyGroupMemberHasLeft(groupPath, message) {
    return admin.database().ref(groupPath).once('value', (snapshot) => {
        console.log(message);
        return;
    });
}