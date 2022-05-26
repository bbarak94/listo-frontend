import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards, saveBoard } from '../store/actions/board.action'
import { BoardPreview } from './board-preview'
import { DynamicPopup } from './dynamic-cmps/dynamic-cmp'

export const BoardList = (props) => {
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    if (!boards) return <h1>loading...</h1>
    return (
        <div className='board-list flex'>
            {boards.map((board) => (
                <BoardPreview board={board} key={board._id} />
            ))}
            <DynamicPopup name={'new-board'} />
        </div>
    )
}
