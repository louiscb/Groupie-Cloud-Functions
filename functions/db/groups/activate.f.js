HTTP Request from app

function ActivateGroup (GroupID, UserID) do
    group = getGroupFromDB(GroupID)

    if UserID == group.owner then
        group.active = true
        updateGroupDB(group)
        //Should we have a main notification function where parameters are a groupID and a message
        //and you notify all members of that group that message?
        notifyGroup(GroupID, "this group is now active")
        return success
    else
        return "user doesn't not have permissions"
    end
end
