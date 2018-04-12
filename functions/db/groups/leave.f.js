// // send group get related active group if any
// HTTP Request from app
//
// function Leave (GroupID, UserID) do
//   if !request.user == UserID
//     return error you are not this user
//
//   group = getGroupFromDB
//
//   group.members remove UserID
//   user.groups(GroupID) remove
//   notificationMemberLeft(GroupID, getUserName(UserID))
// end
