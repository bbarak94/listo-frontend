
// import { utilService } from "./util.service"

export const labelService = {
    toggleLabel,
    getLabelsByIds
}


// function addLabelToTask(label, task) {
//     if (!label.id) label.id = utilService.makeId()
//     if (!task.labelIds) task.labelIds = []
//     task.labelIds.unshift(label.id)
//     return task
// }

function getLabelsByIds(labelIds, board){
    if (!labelIds) return null
    const labels = []
    board.labels.forEach(label => {
        if(labelIds.includes(label.id)){
            labels.push(label)
        }
    })
    console.log('getLabelsByIds ~ labels', labels)
    return labels
}

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


