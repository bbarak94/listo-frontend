import { boardService } from '../../services/board.service'
import { socketService, SOCKET_EVENT_UPDATED_BOARD } from '../../services/socket.service'

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
export function getActionSetFilter(filterBy) {
    return {
        type: 'SET_FILTER',
        filterBy,
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
            dispatch(getActionSetTask(task))
        } catch (err) {
            console.log('Cannot set task', err)
        }
    }
}
export function setFilter(filterBy) {
    console.log('filterBy:', filterBy)
    return async (dispatch) => {
        try {
            dispatch(getActionSetFilter(filterBy))
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
            console.log('return ~ board', board)
            dispatch({ type: actionType, board })
            const savedBoard = await boardService.save(board)
            socketService.emit(SOCKET_EVENT_UPDATED_BOARD, board)
            return savedBoard
        } catch (err) {
            console.log('Cannot save board', err)
        }
    }
}

export function addGroup(groupTitle, boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.addGroup(groupTitle, boardId)
            _dispatchAndEmitBoard(dispatch, board)
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
            _dispatchAndEmitBoard(dispatch, board)
        } catch (err) {
            console.log('Cannot update group', err)
        }
    }
}

export function updateTask(task, boardId, groupId) {
    return async (dispatch) => {
        try {
            const board = await boardService.updateTask(task, boardId, groupId)
            _dispatchAndEmitBoard(dispatch, board)
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
            _dispatchAndEmitBoard(dispatch, board)
        } catch (err) {
            console.log('Cannot add group', err)
        }
    }
}

export function removeGroupFromBoard(board, groupId) {
    return async (dispatch) => {
        try {
            const updatedBoard = boardService.removeGroupFromBoard(board, groupId)
            _dispatchAndEmitBoard(dispatch, updatedBoard)
        } catch (err) {
            console.log('Cannot remove group', err)
        }
    }
}

export function updateBoardToStore(board) {
    return (dispatch) => {
        dispatch({
            type: 'SAVE_BOARD',
            board: board,
        })
    }
}

function _dispatchAndEmitBoard(dispatch, board) {
    dispatch({
        type: 'SAVE_BOARD',
        board: board,
    })
    socketService.emit(SOCKET_EVENT_UPDATED_BOARD, board)
}