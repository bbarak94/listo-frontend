import custom from '../assets/img/task/navbar/custom.svg'
import settings from '../assets/img/task/navbar/settings.svg'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import VideoLabelOutlinedIcon from '@mui/icons-material/VideoLabelOutlined'

import { DynamicPopup } from './dynamic-cmps/dynamic-cmp'
import { TaskArchive } from './archive-task'
import { Cover } from './dynamic-cmps/cover'
import { AppModal } from '../cmps/app-modal'
import { useState } from 'react'

export const TaskNavBar = ({ board, group, task }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')

    const onOpenModal = (type) => {
        console.log('type', type)
        setIsOpen(true)
        setCmpType(type)
    }
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
                <DynamicPopup name={'members'} />
                <DynamicPopup name={'labels'} />
                <DynamicPopup name={'checklist'} />
                <DynamicPopup name={'dates'} />
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

                {/* <ArchiveTask  board={board} task={task} /> */}

            </div>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                task={task}
                boardId={board.Id}
                groupId={group.Id}
            />
        </>
    )
}


