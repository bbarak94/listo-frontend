import { boardService } from '../../services/board.service'

export function getActionSetBoards(boards) {
    return {
        type: 'SET_BOARDS',
        boards,
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

export function setBoard(board) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board });
        } catch (err) {
            console.log('Cannot set board', err);
        }
    };
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

export function getBoard() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            dispatch(getActionSetBoards(boards))
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
    return (dispatch) => {
        const actionType = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD'
        return boardService
            .save(board)
            .then((savedBoard) => {
                dispatch({ type: actionType, board: savedBoard })
                // setUserMsg('Board saved', 'good')
            })
            .catch((err) => {
                throw err
                // console.error('Error:', err)
                // setUserMsg('Cannot save board','bad')
            })
    }
}

export function addGroup(groupTitle, boardId) {
    return async dispatch => {
        try {
            const board = await boardService.addGroup(groupTitle, boardId);
            dispatch({
                type: 'SAVE_BOARD',
                board: board,
            });
        } catch (err) {
            console.log('Cannot add group', err);
        }
    };
}