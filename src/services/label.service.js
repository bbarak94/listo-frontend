
import { utilService } from "./util.service"

export const labelService = {
    toggleLabel,
}


// function addLabelToTask(label, task) {
//     if (!label.id) label.id = utilService.makeId()
//     if (!task.labelIds) task.labelIds = []
//     task.labelIds.unshift(label.id)
//     return task
// }

function toggleLabel(labelId, task) {
    if (!task.labelIds) task.labelIds = []
    if (task.labelIds.includes(labelId)){
        task.labelIds =  task.labelIds.filter(l=>l!==labelId)
    }else{
        task.labelIds.unshift(labelId)
    }
    return task
}


