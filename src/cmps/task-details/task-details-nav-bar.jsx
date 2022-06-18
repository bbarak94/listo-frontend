import { useDispatch } from 'react-redux'

import AttachFileIcon from '@mui/icons-material/AttachFile'
import VideoLabelOutlinedIcon from '@mui/icons-material/VideoLabelOutlined'
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'

import dates from '../../assets/img/task/navbar/dates.svg'
import members from '../../assets/img/task/navbar/members.svg'

import { ArchiveTask } from './archive-task'
import { userService } from '../../services/user.service'
import { updateTask } from '../../store/actions/board.action'

export const TaskDetailsNavBar = ({ onOpenModal, board, group, task }) => {
    const user = userService.getLoggedinUser()
    const dispatch = useDispatch()

    const joinToTask = () => {
        const newTask = { ...task }
        newTask.memberIds.unshift(user._id)
        dispatch(updateTask(newTask, board._id, group.id))
    }

    return (
        <div className='task-nav-bar flex column'>
            <section className='suggested' style={{ width: '100%' }}>
                {!task.memberIds.includes(user._id) && (
                    <>
                        <div className='title-container flex'>
                            <h1 className='title'>Suggested</h1>
                        </div>
                        <div className='task-edit-btn member-join flex align-center' onClick={joinToTask}>
                            <div >
                                <img
                                    src={members}
                                    alt='Members'
                                    style={{ width: '18px' }}
                                />
                            </div>
                            <h2>Join</h2>
                        </div>
                    </>
                )}

            </section>
            <section>
                <div className='title-container flex'>
                    <h1 className='title'>Add to card</h1>
                </div>
                <section className='all-btns flex'>
                    <section>
                        <div onClick={(ev) => onOpenModal(ev, 'members',)}>
                            <div className='task-edit-btn flex align-center'>
                                <div>
                                    <img
                                        className='members-btn'
                                        src={members}
                                        alt='Members'
                                        style={{ width: '18px' }}
                                    />
                                </div>
                                <h2>Members</h2>
                            </div>
                        </div>
                        <div onClick={(ev) => onOpenModal(ev, 'labels')}>
                            <div className='task-edit-btn flex align-center'>
                                <div>
                                    <TurnedInNotRoundedIcon
                                        style={{
                                            width: '16px',
                                            transform: 'rotate(45deg)',
                                            color: '#17244d'
                                        }}
                                    />
                                </div>
                                <h2>Labels</h2>
                            </div>
                        </div>
                        <div onClick={(ev) => onOpenModal(ev, 'checklist')}>
                            <div className='task-edit-btn flex align-center'>
                                <div>
                                    <CheckBoxOutlinedIcon style={{ width: '16px', color: '#17244d' }} />
                                </div>
                                <h2>Checklist</h2>
                            </div>
                        </div>
                        <div onClick={(ev) => onOpenModal(ev, 'dates')}>
                            <div className='task-edit-btn flex align-center'>
                                <div>
                                    <img
                                        src={dates}
                                        alt='Dates'
                                        style={{ width: '17px' }}
                                    />
                                </div>
                                <h2>Dates</h2>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div onClick={(ev) => onOpenModal(ev, 'attachment')}>
                            <div className='task-edit-btn flex align-center'>

                                <div>
                                    <AttachFileIcon
                                        style={{ width: '16px', transform: 'rotate(45deg)', color: '#17244d' }}
                                    />
                                </div>
                                <h2>Attachment</h2>
                            </div>
                        </div>
                        <div>
                            <div className='task-edit-btn flex align-center' onClick={(ev) => onOpenModal(ev, 'cover')}>
                                <div>
                                    <VideoLabelOutlinedIcon style={{ width: '16px', color: '#17244d' }} />
                                </div>
                                <h2>Cover</h2>
                            </div>
                        </div>
                        <ArchiveTask board={board} group={group} task={task} />
                    </section>
                </section>
            </section>
        </div>
    )
}


