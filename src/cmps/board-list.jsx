import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.action'
import { BoardPreview } from './board-preview'

export const BoardList = (props) => {
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    console.log('boards:', boards)

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    if (!boards) return <h1>loading...</h1>
    return (
        <div className='board-list'>
            <h1>board list</h1>
            {boards.map(board =>
                <BoardPreview board={board} key={board._id} />
            )}
        </div>
    )
}
