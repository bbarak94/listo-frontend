const initialState = {
    coverColor: null,
    coverImg: null,
}
export function appReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_COVER_COLOR':
            newState = { ...state, coverColor: action.color }
            break
        case 'SET_COVER_IMG':
            newState = { ...state, coverImg: action.imgUrl }
            break
    }
    window.boardState = newState
    return newState
}
