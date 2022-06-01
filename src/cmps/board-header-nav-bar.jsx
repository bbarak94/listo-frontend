
import { useState } from 'react'

import { AppModal } from './app-modal'
import star from '../assets/img/workspace/star-stroke.svg'
import starFill from '../assets/img/workspace/star-fill.svg'

import { saveBoard } from '../store/actions/board.action'
import { useDispatch } from 'react-redux'

export const BoardHeaderNavBar = ({ board }) => {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(null)
    const [modalPosition, setModalPosition] = useState({})

    const onOpenModal = (ev, type, member) => {

        let elemRect = ev.currentTarget.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.currentTarget.offsetHeight
        top += height

        setModalPosition({ top, left })
        setIsOpen(true)
        setCmpType(type)
        setMember(member)
    }

    const onStarBoard = () => {
        board.isStar = !board.isStar
        dispatch(saveBoard(board))
    }

    return (<>
        <div className="board-header-right-container">
            <div className="board-title-btn">
                <h2>{board.title}</h2>
            </div>
            <div className="board-star" onClick={onStarBoard}>
                {!board.isStar && <img className='stroke' src={star} alt="" />}
                {board.isStar && <img className='fill' src={starFill} alt="" />}
            </div>
            <div className="workspace-btn" onClick={(ev) => onOpenModal(ev, 'workspace-nav-modal')} >
                <span>  Workspace</span>
            </div>
            <div className='members-list-container flex column'>
                <div className='members-avatars-container flex'>
                    {board.members.map((member, idx) => {
                        return (
                            <div key={idx} className='member-container flex' onClick={(ev) => onOpenModal(ev, 'member', member)}>
                                <img src={member.imgUrl} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <div className="board-header-left-container">
            <div className="show-menu-btn" onClick={() => {
                setModalPosition({ top: '43px', right: '0' })
                setIsOpen(true)
                setCmpType('menu') }}>
                <span>... Show menu</span> </div>

            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                board={board}
                position={modalPosition}
                member={member}
            />
        </div>
    </>)
}