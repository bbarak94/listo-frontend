
import { utilService } from "./util.service"

export const labelService = {
    toggleLabel,
    //getBaseLabels
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
            // console.log('gii')
            task.labelIds =  task.labelIds.filter(l=>l!==labelId)
    }else{
        task.labelIds.unshift(labelId)
    }
    return task
}

// function getBaseLabels() {
    
    // return[
    //     { title: '', color: '#61BD4F' },
    //     { title: '', color: '#F2D600' },
    //     { title: '', color: '#FF9F1A' },
    //     { title: '', color: '#EB5A46' },
    //     { title: '', color: '#C377E0' },
    //     { title: '', color: '#0079BF' }
    // ]

// }


