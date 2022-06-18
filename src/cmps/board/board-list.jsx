import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BoardPreview } from './board-preview'
import { AppModal } from '../app-modal'

import starStroke from '../../assets/img/workspace/star-stroke.svg'
import trello from '../../assets/img/asset 11.svg'
import loader from '../../assets/img/loader.svg'

import { loadBoards } from '../../store/actions/board.action'

export const BoardList = () => {

    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const starredBoards = boards.filter(board => board.isStar)

    const onAddBoard = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    if (!boards.length) return <img className='loader' src={loader} alt='Loading...' />
    return (
        <>
            <section className='board-list-container'>
                <div className='title-container flex'>
                    <img src={starStroke} alt='star' style={{ width: '25px' }} />
                    <h2>Starred boards</h2>
                </div>
                <section className='board-list flex'>
                    {starredBoards.map((board) => (
                        <BoardPreview board={board} key={board._id + 'stared'} />
                    ))}
                </section>
            </section>

            <section className='board-list-container'>
                <div className='title-container flex'>
                    <img src={trello} alt='clock' style={{ width: '25px' }} />
                    <h2>All boards</h2>
                </div>
                <div className='board-list flex'>
                    <div onClick={() => onAddBoard()} className='board-preview board-preview-btn flex column align-center justify-center'>
                        <h3>create new board</h3>
                    </div>
                    {boards.map((board) => (
                        <BoardPreview board={board} key={board._id} />
                    ))}
                </div>
            </section>

            <AppModal isOpen={isOpen} setIsOpen={setIsOpen}
                cmpType={'add-board'} onAddBoard={onAddBoard} />
        </>
    )
}
