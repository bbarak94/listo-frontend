const initialState = {
    boards: [],
    board: null,
    currTask: null,
    filterBy: {
        txt: '',
        memberIds: [],
        dueDate: '',
        labelIds: [],
    }
}
export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'SAVE_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'REMOVE_BOARD':
            const lastRemovedBoard = state.boards.find(
                (board) => board._id === action.boardId
            )
            boards = state.boards.filter(
                (board) => board._id !== action.boardId
            )
            newState = { ...state, boards, lastRemovedBoard }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'UPDATE_BOARD':
            boards = state.boards.map((board) =>
                board._id === action.board._id ? action.board : board
            )

            newState = { ...state, board: action.board, boards }
            break
        case 'SET_TASK':
            newState = { ...state, currTask: action.task }
            break
        case 'SET_FILTER':
            newState = { ...state, filterBy: action.filterBy }
            break
    }
    // For debug:
    window.boardState = newState
    return newState
}
