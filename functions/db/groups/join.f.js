// // send group get related active group if any
// HTTP Request from app
//
// function Join (GroupID, UserID) do
//   if !request.user == UserID
//     return error you are not this user
//
//   group = getGroupFromDB
//
//   if group.numberOfMembers < group.maxnumofmembers & group.isActive
//     group.members add UserID
//     user.groups add GroupID
//     notificationNewMember(GroupID)
//   end
// end
