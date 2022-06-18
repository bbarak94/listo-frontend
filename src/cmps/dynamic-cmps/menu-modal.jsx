import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import moment from 'moment'

import { AppModal } from '../app-modal'
import { ArchiveItems } from './archive-items'

import { userService } from '../../services/user.service'

import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'

import archive from '../../assets/img/task/navbar/archive.svg'

export const MenuModal = ({ handleClose, board, setLabelExpand, setTitleLabelClass, setLabelTitleDelay, titleLabelClass }) => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [member, setMember] = useState('')
    const [isArchivedItemsOpen, setIsArchivedItemsOpen] = useState(false)
    const [modalPosition, setModalPosition] = useState({})

    const onOpenModal = (ev, type, member) => {
        setIsOpen(true)
        setMember(member)
        let elemRect = ev.currentTarget.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.currentTarget.offsetHeight
        top += height
        setModalPosition({ top, left })
    }

    return (
        <div className='menu-modal'>
            {isArchivedItemsOpen && < ArchiveItems setLabelTitleDelay={setLabelTitleDelay} onOpenModal={onOpenModal} handleClose={handleClose} board={board}
                setLabelExpand={setLabelExpand} setTitleLabelClass={setTitleLabelClass} titleLabelClass={titleLabelClass} />}

            {!isArchivedItemsOpen &&
                <>
                    <div className='title-container flex justify-center'>
                        <h1>Menu</h1>
                        <div className="close-btn" onClick={handleClose}></div>
                    </div>

                    <hr />

                    <div className="archived-items flex" onClick={() => setIsArchivedItemsOpen(!isArchivedItemsOpen)} >
                        <div className='icon flex justify-center align-center'>
                            <img src={archive} alt="" />
                        </div>
                        <h3>Archived items</h3>
                    </div>
                    <hr />

                    <div className="activities-header flex">
                        <div className='activity-icon-container'>
                            <FormatListBulletedRoundedIcon className='activity-icon' />
                        </div>
                        <h3>Activity</h3>
                    </div>
                    <section className='activities-list menu-layout flex column'>

                        {board.activities.map((activity, idx) => {
                            return (
                                <div className='menu-modal-activities flex' key={idx}>
                                    <div
                                        className='user-container flex'
                                        onClick={async (ev) => {
                                            const member = await userService.getById(activity.byMember._id)
                                            onOpenModal(ev, 'member', member)
                                        }} >
                                        <img src={activity.byMember?.imgUrl} style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                        }} />
                                    </div>
                                    <div className='txt flex column'>
                                        <h1>
                                            {activity.byMember?.fullname}{' '}
                                            <span>
                                                {activity.txt}
                                            </span>
                                            {(activity?.task) && (
                                                <span>
                                                    <a onClick={() => {
                                                        navigate(`/board/${board._id}/task/${activity.task?.id}`)
                                                    }}> {activity.task?.title}</a>
                                                </span>
                                            )}
                                            {(!activity?.task) && (
                                                <span className='board-name'>{' '}{board.title}</span>
                                            )}

                                        </h1>
                                        {(Date.now() - activity.createdAt < 5000) && <h2 className='date'> just now </h2>}
                                        {(Date.now() - activity.createdAt > 5000) && <h2 className='date'>{(moment(activity.createdAt).fromNow())}</h2>}
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                    <AppModal position={modalPosition} member={member} board={board} cmpType={'member'} isOpen={isOpen} setIsOpen={setIsOpen} />
                </>}
        </div>
    )
}



