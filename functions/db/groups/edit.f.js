HTTP Request from app

function EditGroup (Group, UserID) do

    if UserID == group.owner then
        group.active = true
        //Only update certain values such as time? description? Max num of members? location? etc...
        updateGroupDB(group)
        //Should we have a main notification function where parameters are a groupID and a message
        //and you notify all members of that group that message?
        notifyGroup(GroupID, "this group has been changed")
        return success
    else
        return "user doesn't not have permissions"
    end
end
