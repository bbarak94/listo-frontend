import { boardService } from '../../services/board.service'

export function getActionSetBoards(boards) {
    return {
        type: 'SET_BOARDS',
        boards,
    }
}
export function getActionSetBoard(board) {
    return {
        type: 'SET_BOARD',
        board,
    }
}

export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId,
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board,
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board,
    }
}
export function getActionSetTask(task) {
    return {
        type: 'SET_TASK',
        task,
    }
}

export function setBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            dispatch(getActionSetBoard(board))
        } catch (err) {
            console.log('Cannot set board', err)
        }
    }
}

export function setTask(task) {
    return async (dispatch) => {
        try {
            // const task = await boardService.getById(taskId)
            dispatch(getActionSetTask(task))
        } catch (err) {
            console.log('Cannot set task', err)
        }
    }
}

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            dispatch(getActionSetBoards(boards))
        } catch {
            throw new Error('Could not load boards')
        }
    }
}

export function getBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            dispatch(getActionSetBoard(board))
        } catch {
            throw new Error('Could not load boards')
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            dispatch(getActionRemoveBoard(boardId))
        } catch {
            throw new Error('Could not remove board')
        }
    }
}

export function saveBoard(board) {
    return async (dispatch) => {
        const actionType = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD'
        try {
            const savedBoard = await boardService.save(board)
            console.log('return ~ savedBoard', savedBoard)
            dispatch({ type: actionType, board: savedBoard })
            return savedBoard
        } catch(err) {
            throw err
        }
    }
}

export function addGroup(groupTitle, boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.addGroup(groupTitle, boardId)
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            })
        } catch (err) {
            console.log('Cannot add group', err)
        }
    }
}

export function updateGroup(group, boardId) {
        return async (dispatch) => {
        try {
            const board = await boardService.updateGroup(
                group,
                boardId
            )
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            })
        } catch (err) {
            console.log('Cannot update group', err)
        }
    }
}

export function updateTask(task, boardId, groupId ) {
    return async (dispatch) => {
        try {
            const board = await boardService.updateTask(task, boardId, groupId);
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            })
        } catch (err) {
            console.log('Cannot update task', err)
        }
    }
}
export function addTask(taskTitle, boardId, groupId) {
    return async (dispatch) => {
        try {
            const board = await boardService.addTask(
                taskTitle,
                boardId,
                groupId
            )
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            })
        } catch (err) {
            console.log('Cannot add group', err)
        }
    }
}

