import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveBoard } from '../../store/actions/board.action'

import star from '../../assets/img/workspace/star-stroke.svg'
import starFill from '../../assets/img/workspace/star-fill.svg'

export const BoardPreview = ({ board }) => {

    const [isMouseOver, setMouseOver] = useState(false)
    const navigation = useNavigate()
    const dispatch = useDispatch()

    const onStarBoard = (ev, isStar) => {
        ev.stopPropagation()
        board.isStar = isStar
        dispatch(saveBoard(board))
    }

    return (
        <div
            className='board-preview flex column'
            style={{
                backgroundImage: `url(${board.style.background})`,
                backgroundColor: board.style.background,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            onClick={() => {
                navigation(`/board/${board._id}`)
            }}
            onMouseOver={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            <span className='board-title-fade'>

            <div>
                <h2 className='board-preview-title' >{board.title}</h2>
            </div>
            </span>
            {!board.isStar && isMouseOver && <img className='stroke' src={star} alt="" onClick={(ev) => onStarBoard(ev, true)} />}
            {board.isStar && <img className='fill' src={starFill} alt="" onClick={(ev) => onStarBoard(ev, false)} />}
        </div>
    )
}
