import custom from '../assets/img/task/navbar/custom.svg'
import settings from '../assets/img/task/navbar/settings.svg'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import VideoLabelOutlinedIcon from '@mui/icons-material/VideoLabelOutlined'
import dates from '../assets/img/task/navbar/dates.svg'
import members from '../assets/img/task/navbar/members.svg'
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'

import {ArchiveTask} from '../cmps/archive-task'

import { DynamicPopup } from './dynamic-cmps/dynamic-cmp'

export const TaskNavBar = ({ onOpenModal, board, task }) => {

    return (
        <>
            <div className='task-nav-bar flex column'>
                <div className='title-container flex'>
                    <h1 className='title'>Add to card</h1>
                    <div>
                        <img
                            src={settings}
                            alt='Settings'
                            style={{ width: '16px' }}
                        />
                    </div>
                </div>
                <div onClick={() => onOpenModal('members')}>
                    <div className='task-edit-btn flex align-center'>
                        <div>
                            <img
                                src={members}
                                alt='Members'
                                style={{ width: '18px' }}
                            />
                        </div>
                        <h2>Members</h2>
                    </div>
                </div>
                <div onClick={() => onOpenModal('labels')}>
                    <div className='task-edit-btn flex align-center'>
                        <div>
                            <TurnedInNotRoundedIcon
                                style={{
                                    width: '16px',
                                    transform: 'rotate(45deg)',
                                }}
                            />
                        </div>
                        <h2>Labels</h2>
                    </div>
                </div>
                <div onClick={() => onOpenModal('checklist')}>
                    <div className='task-edit-btn flex align-center'>
                        <div>
                            <CheckBoxOutlinedIcon style={{ width: '16px' }} />
                        </div>
                        <h2>Checklist</h2>
                    </div>
                </div>
                {/* <DynamicPopup name={'checklist'} /> */}
                <div onClick={() => onOpenModal('dates')}>
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
                <div className='task-edit-btn flex align-center'>
                    <div>
                        <AttachFileIcon
                            style={{ width: '16px', transform: 'rotate(45deg)' }}
                        />
                    </div>
                    <h2>Attachment</h2>
                </div>
                <div className='task-edit-btn flex align-center'>
                    <div>
                        <LocationOnIcon style={{ width: '16px' }} />
                    </div>
                    <h2>Location</h2>
                </div>
                <div>
                    <div className='task-edit-btn flex align-center' onClick={() => onOpenModal('cover')}>
                        <div>
                            <VideoLabelOutlinedIcon style={{ width: '16px' }} />
                        </div>
                        <h2>Cover</h2>
                    </div>
                </div>
                <div className='task-edit-btn flex align-center'>
                    <div>
                        <img
                            src={custom}
                            alt='Custom Fields'
                            style={{ width: '18px' }}
                        />
                    </div>
                    <h2 >Custom Fields</h2>
                </div>

                <ArchiveTask  board={board} task={task} />

            </div>
        </>
    )
}


