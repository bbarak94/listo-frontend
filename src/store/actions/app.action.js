export function setTask(task) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_TASK', task })
        } catch (err) {
            console.log('Cannot set task', err)
        }
    }
}

export function setCoverColor(color) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_COVER_COLOR', color })
        } catch (err) {
            console.log('Cannot set color', err)
        }
    }
}

export function setCoverImg(imgUrl) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_COVER_IMG', imgUrl })
        } catch (err) {
            console.log('Cannot set image', err)
        }
    }
}

