import { useState } from 'react'
// import { useSelector } from 'react-redux'
import moment from 'moment'
import archive from '../../assets/img/task/navbar/archive.svg'


import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'

import { ArchiveItems } from '../archive-items'

import { AppModal } from '../app-modal'
import { userService } from '../../services/user.service'
import { useNavigate } from 'react-router-dom'


export const MenuModal = ({ handleClose, board, setLabelExpand, setTitleLabelClass, setLabelTitleDelay , titleLabelClass}) => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [member, setMember] = useState('')
    const [isArchivedItemsOpen, setIsArchivedItemsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [modalPosition, setModalPosition] = useState({})

    const onOpenModal = (ev, type, member) => {
        setIsOpen(true)
        // setCmpType(type)
        setMember(member)
        console.log('onOpenModal ~ ev', ev)
        let elemRect = ev.currentTarget.getBoundingClientRect()
        // let elemRect = ev.currentTarget.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.currentTarget.offsetHeight
        top += height
        setModalPosition({ top, left })
    }

    return (
        <div className='menu-modal'>
            {isArchivedItemsOpen && < ArchiveItems setLabelTitleDelay={setLabelTitleDelay} onOpenModal={onOpenModal} handleClose={handleClose} board={board} 
            setLabelExpand={setLabelExpand} setTitleLabelClass={setTitleLabelClass}  titleLabelClass={titleLabelClass}/>}

            {!isArchivedItemsOpen && <>
                <div className='title-container flex justify-center'>
                    <h1>Menu</h1>
                </div>
                <hr></hr>

                <div className="menu-layout flex column">


                    <div className="archived-items flex" onClick={() => setIsArchivedItemsOpen(!isArchivedItemsOpen)} >
                        <div className='icon flex justify-center align-center'>
                            <img src={archive} alt="" />
                        </div>
                        <p>Archived items</p>
                    </div>

                    <div className="activities-header flex">
                        <div className='ctivity-icon-container'>
                            <FormatListBulletedRoundedIcon className='activity-icon' />
                        </div>
                        <h3>Activity</h3>
                    </div>
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
                                        height: '32px', borderRadius: '50%',
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
                </div>
                <AppModal position={modalPosition} member={member} board={board} cmpType={'member'} isOpen={isOpen} setIsOpen={setIsOpen} />
            </>}
        </div>
    )
}



