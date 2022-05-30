import { useState } from 'react'
import { useDispatch } from 'react-redux'

import CreditCardIcon from '@mui/icons-material/CreditCard'
import LabelIcon from '@mui/icons-material/Label'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ScheduleIcon from '@mui/icons-material/Schedule'
import ArchiveIcon from '@mui/icons-material/Archive'

import { AppModal } from './app-modal'
import { updateTask } from '../store/actions/board.action'

export const TaskEditPreviewNav = ({ goToTaskDetails, task, board, group, style }) => {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [position, setPosition] = useState({})

    const onHandleClick = (ev, type) => {
        // ev.preventDefault()

        setIsOpen(true)
        setCmpType(type)

        let elemRect = ev.target.parentNode.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.target.offsetHeight
        setPosition({top, left, height})
    }

    const onToggleTaskToArchive = () => {
        task.archivedAt = Date.now()
        dispatch(updateTask(task, board._id, group.id))
    }

    return (
        <>
            <nav className="task-edit-nav">
                <button onClick={goToTaskDetails}><CreditCardIcon /><span>Open Card</span></button>
                <button onClick={(ev) => onHandleClick(ev, 'labels')}><LabelIcon /><span>Edit labels</span></button>
                <button onClick={(ev) => onHandleClick(ev, 'members')}><PersonOutlineIcon /><span>Change Members</span></button>
                <button onClick={(ev) => onHandleClick(ev, 'cover')}><WallpaperIcon /><span>Change Cover</span></button>
                <button onClick={(ev) => onHandleClick(ev, 'move')}><ArrowForwardIcon /><span>Move</span></button>
                <button onClick={(ev) => onHandleClick(ev, 'copy')}><ContentCopyIcon /><span>Copy</span></button>
                <button onClick={(ev) => onHandleClick(ev, 'dates')}><ScheduleIcon /><span>Edit Dates</span></button>
                <button onClick={(ev) => onToggleTaskToArchive()}><ArchiveIcon /><span>Archive</span></button>
            </nav>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                task={task}
                board={board}
                group={group}
                position={position}
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