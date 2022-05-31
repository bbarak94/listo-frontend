

import { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'

import { AppModal } from '../app-modal'
import { userService } from '../../services/user.service'
import { useNavigate } from 'react-router-dom'


export const MenuModal = ({ handleClose }) => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const navigate = useNavigate()
    // console.log('board:', board)
    // console.log('board.activities:', board.activities)
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
                    console.log('activity:',activity)                    
                    return (
                        <div className='menu-modal-activities flex' key={idx}>
                            <div
                                className='user-container flex'
                                onClick={async () => {
                                    //  console.log('activity.byMember._id:',activity.byMember._id)
                                    const member = await userService.getById(activity.byMember._id)
                                    // console.log('member:',member)                                    
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
                            <div className='txt flex column'>
                                <h1>
                                    {activity.byMember.fullname}{' '}
                                    <span>
                                        {activity.txt}
                                      
                                    </span>
                                    {(activity?.task) && (
                                        <span>
                                            {/* <span>{' to '} </span> */}
                                            <a onClick={() => {
                                                navigate(`/board/${board._id}/task/${activity.task.id}`)
                                            }}> {activity.task.title}</a>
                                        </span>
                                    )}
                                    {(!activity?.task) && (
                                        <span className='board-name'>{' '}{board.title}</span>
                                    )}

                                </h1>
                                {(Date.now()-activity.createdAt < 5000) && <h2 className='date'> just now </h2>}
                                {(Date.now()-activity.createdAt > 5000) && <h2 className='date'>{(moment(activity.createdAt).fromNow())}</h2>}
                                {/* <h2 className='date'>{moment(activity.createdAt).format('MMMM D YYYY [at] h:mm a')}</h2> */}
                            </div>
                        </div>
                    )
                })}
            </div>
            <AppModal member={member} board={board} cmpType={'member'} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
