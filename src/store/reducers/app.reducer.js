const initialState = {
    isScreenOn: false
}
export function appReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_SCREEN_STATE':
            newState = { ...state, coverColor: action.color }
            break
    }
    window.boardState = newState
    return newState
}
