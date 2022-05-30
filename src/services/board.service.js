import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import {
    getActionRemoveBoard,
    getActionAddBoard,
    getActionUpdateBoard,
} from '../store/actions/board.action'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'
const boardChannel = new BroadcastChannel('boardChannel')
// const listeners = []

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
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
    createActivity
}
window.cs = boardService

function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}
async function remove(boardId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!')
    await storageService.remove(STORAGE_KEY, boardId)
    boardChannel.postMessage(getActionRemoveBoard(boardId))
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

async function getEmptyBoard() {
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
                _id: 'u100',
                fullname: 'Guest',
                username: 'guest',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guest_he90su.jpg',
            }, {
                id: 'u101',
                fullname: 'Barak Braun',
                username: 'barak',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/barak_v05fhi.jpg',
            },
            {
                id: 'u102',
                fullname: 'Guy Elizarov',
                username: 'guy',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guy_r35jqz.jpg',
            },
            {
                id: 'u103',
                fullname: 'Itai Rotstein',
                username: 'itai',
                imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/itai_thvoqr.jpg',
            },
            {
                id: 'u104',
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

function subscribe(listener) {
    boardChannel.addEventListener('message', listener)
}
function unsubscribe(listener) {
    boardChannel.removeEventListener('message', listener)
}

async function addGroup(title, boardId) {
    const user = userService.getLoggedinUser()
    console.log('user:', user)
    const newGroup = {
        id: utilService.makeId(),
        title,
        tasks: [],
    }
    try {
        const board = await getById(boardId)




        board.groups.push(newGroup)
        save(board)
        return board
    } catch (err) {
        console.log('Cannot add group', err)
    }
}

async function updateGroup(groupToUpdate, boardId) {
    try {
        const board = await getById(boardId)
        let groupIdx = board.groups.findIndex(currGroup => currGroup.id === groupToUpdate.id)
        board.groups.splice(groupIdx, 1, groupToUpdate)
        // const newActivity = createActivity('updated',newTask)
        // board.activities.unshift(newActivity)
        save(board)
        return board
    } catch (err) {
        console.log('Cannot add group', err)
    }
}

async function addTask(title, boardId, groupId) {
    const newTask = {
        id: utilService.makeId(),
        title,
        status: '',
        description: '',
        comments: [],
        checklists: [],
        memberIds: [],
        labelIds: [],
        createdAt: Date.now(),
        dueDate: null,
        byMember: null,
        style: {
            color: null,
            imgUrl: null,
            isCoverSizeBig: false
        },
        archivedAt: null
    }
    try {
        const board = await getById(boardId)
        let group = board.groups.find(group => group.id === groupId)
        console.log('group from service', group)
        group.tasks.push(newTask)
        // const newActivity = await createActivity('added a task',newTask)
        // board.activities.unshift(newActivity)
        save(board)
        return board
    } catch (err) {
        console.log('Cannot add Task', err)
    }
}

async function updateTask(taskToUpdate, boardId, groupId) {
    try {
        const board = await getById(boardId)
        let group = board.groups.find(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskToUpdate.id)
        group.tasks.splice(taskIdx, 1, taskToUpdate)
        const newActivity = createActivity('made changes to list', taskToUpdate)
        board.activities.unshift(newActivity)
        save(board)
        // console.log('board:',board)

        return board
    } catch (err) {
        console.log('Cannot update Task', err)
    }
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


function removeTaskFromBoard(taskId, board) {
    const boardToUpdate = { ...board }
    const { currTask } = getTaskAndGroup(board, taskId)
    const currGroup = getGroup(boardToUpdate, taskId)
    const newActivity = createActivity('deleted a task from', currTask)
    board.activities.unshift(newActivity)
    currGroup.tasks = currGroup.tasks.filter(t => t.id !== taskId)
    return boardToUpdate
}

function getMembersByIds(memberIds, board) {
    if (!memberIds) return null
    const members = []
    board.members.forEach(member => {
        if (memberIds.includes(member.id)) {
            members.push(member)
        }
    })
    // console.log('getLabelsByIds ~ members', members)
    return members
}

function getEmptyTodo() {
    return {
        id: utilService.makeId(),
        title: '',
        isDone: false
    }
}

// function createActivity(task,user,txt) {
function createActivity(txt, task) {
    return {
        byMember: userService.getLoggedinUser(),
        id: utilService.makeId(),
        createdAt: Date.now(),
        txt,
        task: {
            id: task.id,
            title: task.title,
            txt:txt
        },
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




