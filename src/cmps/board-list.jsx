import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards, saveBoard } from '../store/actions/board.action'
import { BoardPreview } from './board-preview'

import { NewBoardPrev } from './dynamic-cmps/new-board-prev'

export const BoardList = (props) => {
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    const onAddBoard = () => {
        console.log('new board');
    }

    if (!boards) return <h1>loading...</h1>
    return (
        <div className='board-list flex'>
            {boards.map((board) => (
                <BoardPreview board={board} key={board._id} />
            ))}
            <NewBoardPrev />
        </div>
    )
}
