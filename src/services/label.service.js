
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
     const taskToUpdate = {...task}
    if (!taskToUpdate.labelIds) taskToUpdate.labelIds = []
    if (taskToUpdate.labelIds.includes(labelId)){
        console.log("yes");
        taskToUpdate.labelIds =  taskToUpdate.labelIds.filter(l=>l!==labelId)
        console.log('toggleLabel ~ taskToUpdate', taskToUpdate.labelIds)
    }else{
        console.log("no");
        taskToUpdate.labelIds.unshift(labelId)
        console.log('toggleLabel ~ taskToUpdate', taskToUpdate.labelIds)
    }
    // console.log('toggleLabel ~ taskToUpdate', taskToUpdate)
    return Promise.resolve(taskToUpdate)
    // return task
}


