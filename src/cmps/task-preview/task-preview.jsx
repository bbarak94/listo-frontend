import { useState } from 'react'
import { Link } from 'react-router-dom'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { TaskEdit } from './task-edit'
import { Screen } from '../board/screen'
import { Labels } from './preview-labels'
import { Dates } from './preview-dates'
import { Description } from './preview-description'
import { Attachments } from './preview-attachments'
import { Checklists } from './preview-checklists'
import { Comments } from './preview-comments'
import { Members } from './preview-members'

import { utilService } from '../../services/util.service'

const previewIconStyle = { fontSize: '16px' }

export const TaskPreview = ({ task, board, group, onOpenModal, setTaskEditExpand,
    taskEditExpandId, setLabelExpand, labelExpandClass, titleLabelClass, setLabelTitleDelay }) => {

    const [style, setStyle] = useState({})

    const onOpenTaskEdit = (ev) => {
        ev.preventDefault()

        const elemRect = ev.currentTarget.parentNode.getBoundingClientRect()
        const width = ev.currentTarget.parentNode.offsetWidth
        const left = elemRect.left - window.pageXOffset
        const top = elemRect.top - window.pageYOffset

        const style = utilService.getTaskEditPosition(top, left, width)
        setStyle(style)
        setTaskEditExpand(task.id)
    }
    return (
        <div className="task-preview-main">
            <Link to={`/board/${board._id}/task/${task.id}`}>
                <div className="task-preview-container flex column">
                    <div className="task-preview">
                        {!task.archivedAt && <EditOutlinedIcon className='edit-icon' onClick={onOpenTaskEdit} />}
                        {task.style.color &&
                            <div className="task-preview-color" style={{ backgroundColor: task.style.color, minHeight: task.style.isTextOnImg ? '56px' : '32px' }}>
                                {task.style.isTextOnImg && <span className='title-over-color'>{task.title}</span>}
                            </div>}

                        {task.style.imgUrl &&
                            <div className="task-preview-img-container">
                                <img src={task.style.imgUrl} />
                                {task.style.isTextOnImg &&
                                    <div className='title-over-img'>
                                        <div className='title-shade'></div>
                                        <span>{task.title}</span>
                                    </div>}
                            </div>}

                        <Labels board={board} task={task} labelExpandClass={labelExpandClass} titleLabelClass={titleLabelClass}
                            setLabelExpand={setLabelExpand} setLabelTitleDelay={setLabelTitleDelay} />

                        {!task.style.isTextOnImg && <div className='preview-title flex space-between'>
                            <div className='task-preview-title'>
                                <span>{task.title}</span>
                            </div>
                        </div>}

                        {(task.memberIds?.length > 0 || task.dueDate || task.description
                            || task.attachments?.length > 0 || task.checklists?.length > 0
                            || task.comments?.length > 0) && !task.style.isTextOnImg && (
                                <div className='task-preview-small-previews flex'>
                                    <Dates board={board} group={group} task={task} />
                                    <Description task={task} previewIconStyle={previewIconStyle} />
                                    <Attachments task={task} previewIconStyle={previewIconStyle} />
                                    <Checklists task={task} previewIconStyle={previewIconStyle} />
                                    <Comments task={task} previewIconStyle={previewIconStyle} />
                                    <Members board={board} task={task} onOpenModal={onOpenModal} />
                                </div>
                            )}
                    </div>
                </div>
            </Link>
            {!task.archiveAt && taskEditExpandId === task.id && <>
                <Screen cb={() => setTaskEditExpand(null)} />
                <TaskEdit task={task} board={board} group={group} setTaskEditExpand={setTaskEditExpand}
                    style={style} previewIconStyle={previewIconStyle} onOpenModal={onOpenModal} />
            </>}
        </div>
    )
}

