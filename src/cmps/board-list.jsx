import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards, saveBoard } from '../store/actions/board.action'
import { BoardPreview } from './board-preview'

import {AppHeader} from './app-header'

import { NewBoardPrev } from './dynamic-cmps/new-board-prev'
import { AppModal } from './app-modal'

export const BoardList = (props) => {
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const onAddBoard = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    if (!boards) return <h1>loading...</h1>
    return (
        <>
            <div className='board-list flex'>
            <AppHeader />
                {boards.map((board) => (
                    <BoardPreview board={board} key={board._id} />
                ))}
                {/* <NewBoardPrev /> */}
                <div onClick={() => onAddBoard()} className='board-preview board-preview-btn flex column align-center justify-center'>
                    {/* <div className="flex"> */}
                        <h3>create new board</h3>
                    {/* </div> */}
                </div>
            </div>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={'add-board'}
                onAddBoard={onAddBoard}
            />
        </>
    )
}
