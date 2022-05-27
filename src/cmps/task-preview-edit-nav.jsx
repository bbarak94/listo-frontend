import CreditCardIcon from '@mui/icons-material/CreditCard';
import LabelIcon from '@mui/icons-material/Label';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArchiveIcon from '@mui/icons-material/Archive';

import { AppModal } from './app-modal';
import { useState } from 'react';

export const TaskEditPreviewNav = ({ goToTaskDetails, task, boardId, groupId }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')

    const onHandleClick = (type) => {
        setIsOpen(true)
        setCmpType(type)
    }

    return (
        <>
            <nav className="task-edit-nav">
                <button onClick={goToTaskDetails}><CreditCardIcon /><span>Open Card</span></button>
                <button onClick={() => onHandleClick('labels')}><LabelIcon /><span>Edit labels</span></button>
                <button onClick={() => onHandleClick('members')}><PersonOutlineIcon /><span>Change Members</span></button>
                <button onClick={() => onHandleClick('cover')}><WallpaperIcon /><span>Change Cover</span></button>
                <button onClick={() => onHandleClick('move')}><ArrowForwardIcon /><span>Move</span></button>
                <button onClick={() => onHandleClick('copy')}><ContentCopyIcon /><span>Copy</span></button>
                <button onClick={() => onHandleClick('dates')}><ScheduleIcon /><span>Edit Dates</span></button>
                <button onClick={() => onHandleClick('archive')}><ArchiveIcon /><span>Archive</span></button>
            </nav>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                task={task}
                boardId={boardId}
                groupId={groupId}
            />
        </>
    )
}

















{/* {editors.map((editor, idx) =>
                <button key={idx}>{editor.icon}{editor.title}</button>
            )} */}



    // const card = <CreditCardIcon />
    // const label = <LabelIcon />
    // const member = <PersonOutlineIcon />
    // const cover = <WallpaperIcon />
    // const move = <ArrowForwardIcon />
    // const copy = <ContentCopyIcon />
    // const dates = <ScheduleIcon />
    // const archive = <ArchiveIcon />

    // const editors = [
    //     { title: 'Open Card', icon: card },
    //     { title: 'Edit labels', icon: label },
    //     { title: 'Change Members', icon: member },
    //     { title: 'Change Cover', icon: cover },
    //     { title: 'Move', icon: move },
    //     { title: 'Copy', icon: copy },
    //     { title: 'Edit Dates', icon: dates },
    //     { title: 'Archive', icon: archive },
    // ]