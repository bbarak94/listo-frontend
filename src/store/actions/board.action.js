import { boardService } from '../../services/board.service'

export function getActionSetBoards(boards) {
    return {
        type: 'SET_BOARDS',
        boards,
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

