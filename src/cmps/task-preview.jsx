import { useState } from 'react'
import { Link } from 'react-router-dom'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { TaskEdit } from './task-edit'
import { Screen } from './screen'

import { Labels } from './task-preview/labels'
import { Dates } from './task-preview/dates'
import { Description } from './task-preview/description'
import { Attachments } from './task-preview/attachments'
import { Checklists } from './task-preview/checklists'
import { Comments } from './task-preview/comments'
import { Members } from './task-preview/members'

const previewIconStyle = {
    fontSize: '16px'
}

export const TaskPreview = ({ task, board, group, onOpenModal, setTaskEditExpand,
    taskEditExpandId, setLabelExpand, labelExpandClass, titleLabelClass, setLabelTitleDelay }) => {

    const [style, setStyle] = useState({ top: '', left: '', width: '' })

    const onOpenTaskEdit = (ev) => {
        ev.preventDefault()
        // ****** Task edit relative to task preview ********
        let elemRect = ev.currentTarget.parentNode.parentNode.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        // ****** Task edit width relative to task preview width ********
        const width = ev.target.parentNode.offsetWidth
        setStyle({ top, left, width })
        setTaskEditExpand(task.id)
    }

    return (
        <div className="task-preview-helper">
            <Link to={`/board/${board._id}/task/${task.id}`}>
                <div className="task-preview-container flex column">
                    <div className="task-preview">
                        <EditOutlinedIcon className='edit-icon' onClick={onOpenTaskEdit} />
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
                                <div className='previews flex'>
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

