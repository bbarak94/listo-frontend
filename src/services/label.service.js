
// import { utilService } from "./util.service"

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
     const taskToUpdate = {...task}
    if (!taskToUpdate.labelIds) taskToUpdate.labelIds = []
    if (taskToUpdate.labelIds.includes(labelId)){
        taskToUpdate.labelIds =  taskToUpdate.labelIds.filter(l=>l!==labelId)
    }else{
        taskToUpdate.labelIds.unshift(labelId)
    }
    return taskToUpdate
}


