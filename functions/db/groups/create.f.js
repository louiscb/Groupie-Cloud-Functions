HTTP Request from app

function CreateGroup (group) do
    if addGroupToDB(group) == success do
        addGroupToUserHistoryGroups(group.ID)
        increaseSubjectFrequency(group.subject)
        return success
    else
        return error adding group to db
    end
end
