HTTP Request from app

function DeleteGroup (GroupID) do
    group = getGroupFromDB(GroupID)
    //how can we authenticate that the user is who they say they are?

    if group.owner == request.UserID do
      group.deleted = true
      updateGroupDB(group)
      notifyGroup(groupID, "Deleted group")
      return success
    else
      return cannot delete group
    end
end
