// // send group get related active group if any
// HTTP Request from app
//
// function GetRecommended (UserID) do
//   list = getGroupFromDB(active)
//   subject = getFavouriteSubject(UserID)
//
//   list = list where list.subject == subject
//
//   if list > 3
//     list = list where list.dayOfMeeting == today && list.numberOfMembers > 1
//   etc ...
//
//   return first 3 of list
// end
