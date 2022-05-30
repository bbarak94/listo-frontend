
import { utilService } from "./util.service"

export const labelService = {
    toggleLabel,
    getLabelsByIds,
    getLabel,
    getBasicColors,
    getEmptyLabel
}

// function addLabelToTask(label, task) {
//     if (!label.id) label.id = utilService.makeId()
//     if (!task.labelIds) task.labelIds = []
//     task.labelIds.unshift(label.id)
//     return task
// }

function getLabelsByIds(labelIds, board) {
    if (!labelIds) return null
    const labels = []
    board.labels.forEach(label => {
        if (labelIds.includes(label.id)) {
            labels.push(label)
        }
    })
    return labels
}

function toggleLabel(labelId, task) {
    const taskToUpdate = { ...task }
    if (!taskToUpdate.labelIds) taskToUpdate.labelIds = []
    if (taskToUpdate.labelIds.includes(labelId)) {
        taskToUpdate.labelIds = taskToUpdate.labelIds.filter(l => l !== labelId)
    } else {
        taskToUpdate.labelIds.unshift(labelId)
    }
    return taskToUpdate
}

function getBasicColors() {
    return ['#61BD4F', '#F2D600', '#FF9F1A', '#EB5A46', '#C377E0', '#0079BF', '#00C2E0', '#51E898', '#FF78CB', '#344563']
}

function getEmptyLabel() {
    return {
        title: '',
        color: ''
    }
}

function getLabel(labelId, board) {
    return board.labels?.find(l => l.id === labelId)
}