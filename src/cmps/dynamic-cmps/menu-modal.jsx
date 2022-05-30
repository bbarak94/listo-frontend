

import { useState } from 'react'
import { useSelector } from 'react-redux'

import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'

import { AppModal } from '../app-modal'
import { userService } from '../../services/user.service'
import { useNavigate } from 'react-router-dom'


export const MenuModal = ({ handleClose }) => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const navigate = useNavigate()
    console.log('board:', board)
    console.log('board.activities:', board.activities)
    // const { user } = useSelector((storeState) => storeState.userModule)
    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState('')

    const onOpenModal = (type, member) => {
        setIsOpen(true)
        setCmpType(type)
        setMember(member)
    }

    return (
        <div className='menu-modal'>
            <div className='title-container flex justify-center'>
                <h1>Menu</h1>
            </div>
            <hr></hr>
            <div className="activities flex column">
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
                                onClick={() => {
                                    const member = userService.getById(activity.byMember.id)
                                    onOpenModal('member', member)
                                }}
                            >
                                <img
                                    src={activity.byMember.imgUrl}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>
                            <div className='txt flex'>
                                <h1>
                                    {activity.byMember.fullname}{' '}
                                    <span>
                                        {activity.txt}
                                        {' to '}
                                    </span>
                                    <a onClick={() =>{
                                        navigate(`/board/${board.id}/task/${activity.task.id}`)}}> {activity.task.title}</a>

                                </h1>
                            </div>
                        </div>
                    )
                })}
            </div>
            <AppModal member={member} board={board} cmpType={'member'} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
