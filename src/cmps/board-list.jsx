import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.action'

export const BoardList = (props) => {
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    console.log('boards:', boards)

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    return (
        <div className='board-list'>
            <h1>board list</h1>
        </div>
    )
}
