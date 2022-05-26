export function setTask(task) {
    return dispatch => {
        try {
            dispatch({ type: 'SET_TASK', task });
        } catch (err) {
            console.log('Cannot set task', err);
        }
    };
}