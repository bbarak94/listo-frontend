import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards, saveBoard } from '../store/actions/board.action'
import { BoardPreview } from './board-preview'

import { AppHeader } from './app-header'

import { NewBoardPrev } from './dynamic-cmps/new-board-prev'
import { AppModal } from './app-modal'

import starStroke from '../assets/img/workspace/star-stroke.svg'
import clock from '../assets/img/workspace/clock.svg'

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
    const starredBoards = boards.filter(board => board.isStar)
    const allBoards = boards.filter(board => !board.isStar)
    console.log('BoardList ~ boards', boards)
    return (
        <section className="board-list">
            <section className='starred-boards '>
                <div className='title-container flex'>
                    <img
                        src={starStroke}
                        alt='star'
                        style={{ width: '25px' }}
                    />
                    <h2>Starred boards</h2>
                </div>
                <section className='board-list flex'>
                    {starredBoards.map((board) => (
                        <BoardPreview board={board} key={board._id+'stared'} />
                    ))}
                </section>
            </section>

            <section>
                <div className='flex align-center'>
                    <div className='title-container flex'>
                        <img  src={clock} alt='clock' style={{ width: '25px' }}  />
                    </div>
                    <h2>Recently viewed</h2>
                </div>
                <div className='board-list flex'>
                    <div onClick={() => onAddBoard()} className='board-preview board-preview-btn flex column align-center justify-center'>
                        <h3>create new board</h3>
                    </div>
                    {allBoards.map((board) => (
                        <BoardPreview board={board} key={board._id} />
                    ))}
                </div>
            </section>

            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={'add-board'}
                onAddBoard={onAddBoard}
            />
        </section>
    )
}
