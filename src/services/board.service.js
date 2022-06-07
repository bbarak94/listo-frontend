import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const boardChannel = new BroadcastChannel('boardChannel')

export const boardService = {
    query,
    getById,
    save,
    remove,
    _getEmptyBoard,
    subscribe,
    unsubscribe,
    addGroup,
    updateGroup,
    addTask,
    updateTask,
    getTaskAndGroup,
    removeTaskFromBoard,
    getGroup,
    getGroupById,
    getMembersByIds,
    getEmptyTodo,
    getArchivedTasks,
    removeGroupFromBoard,
    getDataForDashboard
}
window.cs = boardService

async function query() {
    return await httpService.get('board/')
}

async function getById(boardId) {
    return await httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return await httpService.delete(`board/${boardId}`)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/`, board)
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))
    } else {
        savedBoard = await httpService.post(`board/`, board)
        // boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

function subscribe(listener) {
    boardChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
    boardChannel.removeEventListener('message', listener)
}

async function addGroup(title, boardId) {
    const newGroup = _getEmptyGroup(title)
    return await httpService.post(`board/${boardId}/group/${newGroup.id}`, newGroup)
}

async function updateGroup(groupToUpdate, boardId) {
    return await httpService.put(`board/${boardId}/group`, groupToUpdate)
}

async function addTask(title, boardId, groupId) {
    const newTask = _getEmptyTask(title)
    return await httpService.post(`board/${boardId}/group/${groupId}/task/${newTask.id}`, newTask)
}

async function updateTask(taskToUpdate, boardId, groupId) {
    return await httpService.put(`board/${boardId}/group/${groupId}/task`, taskToUpdate)
}

function getTaskAndGroup(board, taskId) {
    if (!board) return
    let currTask
    let currGroup
    board.groups.forEach((g) => {
        if (currTask) return
        currTask = g.tasks.find((t) => {
            if (t.id === taskId) {
                currGroup = g
                return true
            }
        })
    })
    currGroup = structuredClone(currGroup)
    currTask = structuredClone(currTask)
    return { currGroup, currTask }
}

function getGroup(board, taskId) {
    return board.groups.find((g) => {
        return g.tasks.find((t) => (t.id === taskId))
    })
}

function getGroupById(board, groupId) {
    return board.groups.find((g) => g.id === groupId)
}

function removeTaskFromBoard(board, taskId) {
    const boardToUpdate = { ...board }
    const { currGroup, currTask } = getTaskAndGroup(boardToUpdate, taskId)
    const newActivity = _createActivity('deleted a task', currTask)
    boardToUpdate.activities.unshift(newActivity)
    currGroup.tasks = currGroup.tasks.filter(t => t.id !== taskId)
    return boardToUpdate
}

function getArchivedTasks(board) {
    const archivedTask = []
    board.groups?.forEach(group => {
        group.tasks?.forEach(task => {
            if (task.archivedAt) archivedTask.push(task)
        })
    })
    return archivedTask
}

function getMembersByIds(memberIds, board) {
    if (!memberIds) return null
    const members = []
    board.members.forEach(member => {
        if (memberIds.includes(member.id)) {
            members.push(member)
        }
    })
    return members
}

function removeGroupFromBoard(board, groupId) {
    const boardToUpdate = { ...board }
    const groupIdx = boardToUpdate.groups?.findIndex(group => group.id === groupId)
    boardToUpdate.groups?.splice(groupIdx, 1)
    save(boardToUpdate)
    return boardToUpdate
}

function getEmptyTodo() {
    return {
        id: utilService.makeId(),
        title: '',
        isDone: false
    }
}

async function _getEmptyBoard() {
    const newBoard = {
        title: 'New Board',
        archivedAt: null,
        createdAt: Date.now(),
        createdBy: await userService.getLoggedinUser(),
        style: {
            background: null,
        },
        labels: [
            { id: 'l101', title: '', color: '#61BD4F' },
            { id: 'l102', title: '', color: '#F2D600' },
            { id: 'l103', title: '', color: '#FF9F1A' },
            { id: 'l104', title: '', color: '#EB5A46' },
            { id: 'l105', title: '', color: '#C377E0' },
            { id: 'l106', title: '', color: '#0079BF' }
        ],
        members: [
            {
                _id: '62953c7742e472253897fe9e',
                fullname: 'Guest',
                username: 'guest',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guest_he90su.jpg',
            }, {
                id: '62953ca542e472253897fe9f',
                fullname: 'Barak Braun',
                username: 'barak',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            {
                id: '62953cb842e472253897fea0',
                fullname: 'Guy Elizarov',
                username: 'guy',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
            },
            {
                id: '62953ccb42e472253897fea1',
                fullname: 'Itai Rotstein',
                username: 'itai',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
            },
            {
                id: '62953cd942e472253897fea2',
                fullname: 'Tommy Irmia',
                username: 'tommy',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653410100/tommy_rnax4n.jpg',
            },
        ],
        groups: [
            {
                id: utilService.makeId(),
                title: 'Todo',
                tasks: []
            },
            {
                id: utilService.makeId(),
                title: 'Doing',
                tasks: []
            },
            {
                id: utilService.makeId(),
                title: 'Done',
                tasks: []
            },
        ],
        activities: [
            {
                id: utilService.makeId(),
                txt: 'created a board',
                createdAt: Date.now(),
                byMember: await userService.getLoggedinUser(),
            },
        ],
    }
    return newBoard
}

function _getEmptyGroup(title) {
    return {
        id: utilService.makeId(),
        title,
        tasks: [],
    }
}

function _getEmptyTask(title) {
    return {
        id: utilService.makeId(),
        title,
        status: '',
        description: '',
        comments: [],
        checklists: [],
        memberIds: [],
        attachments: [],
        labelIds: [],
        createdAt: Date.now(),
        dueDate: null,
        isComplete: false,
        byMember: null,
        style: {
            color: null,
            imgUrl: null,
            isTextOnImg: false
        },
        archivedAt: null,
    }
}

function _createActivity(txt, task) {
    return {
        byMember: userService.getLoggedinUser(),
        id: utilService.makeId(),
        createdAt: Date.now(),
        txt,
        task: {
            id: task.id,
            title: task.title,
            txt: txt
        },
    }
}

function getDataForDashboard(board) {

    const currTime = Date.now()

    const data = {
        totalTasksCount: 0,
        tasksPerMembers: {
            members: [],
            count: [],
        },
        tasksPerLabels: {
            colors: [],
            count: [],
            title: []
        },
        dueTasksCount: 0,
        overDueTasksCount: 0,
        completedTasksCount: 0
    }

    board.groups.forEach(group => {
        group.tasks.forEach(task => {
            if (task.archivedAt) return
            data.totalTasksCount++
            board.members.forEach((member, idx) => {
                data.tasksPerMembers.members[idx] = member.fullname
                if (task.memberIds?.includes(member.id)) {
                    const currCount = data.tasksPerMembers.count[idx]
                    data.tasksPerMembers.count[idx] = currCount ? currCount + 1 : 1
                }
            })
            board.labels.forEach((label, idx) => {
                data.tasksPerLabels.colors[idx] = label.color
                data.tasksPerLabels.title[idx] = label.title
                if (task.labelIds?.includes(label.id)) {
                    const currCount = data.tasksPerLabels.count[idx]
                    data.tasksPerLabels.count[idx] = currCount ? currCount + 1 : 1
                }
            })
            if (task.dueDate) {
                if (task.dueDate > currTime) {
                    data.dueTasksCount++
                } else {
                    data.overDueTasksCount++
                }
            }
            if (task.isComplete) data.completedTasksCount++
        })
    })
    return data
}




