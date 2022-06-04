import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { TaskEdit } from './task-edit'
import { Screen } from './screen'

import { labelService } from "../services/label.service"
import { boardService } from "../services/board.service"

import { updateTask } from '../store/actions/board.action'
import { minHeight } from '@mui/system'

const NO_COLOR_INDICATION = '#B3BAC5'

const dateIconStyle = {
    fontSize: '18px',
    paddingTop: '2px'
}

const previewIconStyle = {
    fontSize: '16px'
}

export const TaskPreview = ({ task, board, group, onOpenModal, setTaskEditExpand,
    taskEditExpandId, setLabelExpand, labelExpandClass, titleLabelClass, setLabelTitleDelay }) => {

    const dispatch = useDispatch()
    const [isMouseOver, setIsMouseOver] = useState(false)
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

    const onExpandLabels = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        labelExpandClass = (labelExpandClass === 'expand') ? 'shrink' : 'expand'
        setLabelExpand(labelExpandClass)
        setLabelTitleDelay(labelExpandClass)
    }

    const onCompleteTask = (ev) => {
        ev.preventDefault()
        const taskToUpdate = { ...task }
        taskToUpdate.isComplete = !taskToUpdate.isComplete
        dispatch(updateTask(taskToUpdate, board._id, group.id))
    }

    const getChecklistData = () => {
        var todoCount = 0
        var doneCount = 0
        task.checklists.forEach(checklist => {
            checklist.todos.forEach(todo => {
                todoCount++
                if (todo.isDone) doneCount++
            })
        })
        return `${doneCount}/${todoCount}`
    }

    let dateClass
    if (task.isComplete) dateClass = 'complete'
    else if (!task.isComplete && task.dueDate < Date.now()) dateClass = 'pastDue'
    else dateClass = ''

    return (
        <div className="task-preview-helper">
            <Link to={`/board/${board._id}/task/${task.id}`}>
                <div className="task-preview-container flex column">
                    <div className="task-preview">
                        <EditOutlinedIcon className='edit-icon' onClick={onOpenTaskEdit} />
                        {task.style.color && <div className="task-preview-color" style={{ backgroundColor: task.style.color, minHeight: task.style.isTextOnImg ? '56px' : '32px' }}>
                            {task.style.isTextOnImg &&
                                <span className='title-over-color'>{task.title}</span>
                            }
                        </div>
                        }
                        {task.style.imgUrl &&
                            <div className="task-preview-img-container">
                                <img src={task.style.imgUrl} />
                                {task.style.isTextOnImg &&
                                    <div className='title-over-img'>
                                        <div className='title-shade'></div>
                                        <span>{task.title}</span>
                                    </div>
                                }
                            </div>}

                        {(task.labelIds?.length > 0) && !task.style.isTextOnImg && (
                            <div className='task-preview-labels flex'>
                                {labelService.getLabelsByIds(task.labelIds, board).map((label) => {
                                    return (label.color !== NO_COLOR_INDICATION && <div key={label.id}
                                        className={`task-preview-label ${labelExpandClass}`} onClick={onExpandLabels}
                                        style={{ backgroundColor: label.color, }} >
                                        <span className={titleLabelClass}>{label.title}</span>
                                    </div>
                                    )
                                })}
                            </div>
                        )}

                        {!task.style.isTextOnImg && <div className='preview-title flex space-between'>
                            <div className='task-preview-title'>
                                <span >{task.title} </span>
                            </div>
                        </div>}

                        {(task.memberIds?.length > 0 || task.dueDate || task.description
                            || task.attachments?.length > 0 || task.checklists?.length > 0
                            || task.comments?.length > 0) && !task.style.isTextOnImg && (
                                <div className='previews flex'>
                                    {task.dueDate && (
                                        <div className={`task-preview-date flex ${dateClass}`}
                                            onMouseOver={() => setIsMouseOver(true)}
                                            onMouseOut={() => setIsMouseOver(false)}
                                            onClick={onCompleteTask}
                                        >
                                            {!isMouseOver && <AccessTimeIcon style={dateIconStyle} />}
                                            {isMouseOver && task.isComplete && <CheckBoxOutlinedIcon style={dateIconStyle} />}
                                            {isMouseOver && !task.isComplete && <CheckBoxOutlineBlankIcon style={dateIconStyle} />}

                                            <span>
                                                {moment(task.dueDate).format('MMMM D')}
                                            </span>
                                        </div>
                                    )}
                                    {task.description &&
                                        <div className="preview-small-icon" title='This card has a description'>
                                            <ArticleOutlinedIcon style={previewIconStyle} />
                                        </div>}

                                    {task.attachments?.length > 0 &&
                                        <div className="preview-small-icon" title='Attachments'>
                                            <AttachFileOutlinedIcon style={previewIconStyle} />
                                        </div>}

                                    {task.checklists?.length > 0 &&
                                        <div className="preview-small-icon" title='Checklist items'>
                                            <LibraryAddCheckOutlinedIcon style={previewIconStyle} />
                                            <span>{getChecklistData()}</span>
                                        </div>}

                                    {task.comments?.length > 0 &&
                                        <div className="preview-small-icon" title='Comments'>
                                            <ChatBubbleOutlineOutlinedIcon style={previewIconStyle} />
                                        </div>}

                                    {task.memberIds?.length > 0 && <div className='members-list-container flex column'>
                                        <div className='members-avatars-container-task-preview flex'>
                                            {boardService.getMembersByIds(task.memberIds, board)?.map((member) => {
                                                return (
                                                    <div title={member.fullname} key={member.id} className='member-container flex'
                                                        onClick={(ev) => {
                                                            ev.preventDefault()
                                                            onOpenModal(ev, 'member', member)
                                                        }} >
                                                        <img src={member.imgUrl} />
                                                    </div>)
                                            })}
                                        </div>
                                    </div>}
                                </div>
                            )}
                    </div>
                </div>
            </Link>
            {taskEditExpandId === task.id && <>
                <Screen cb={() => setTaskEditExpand(null)} />
                <TaskEdit task={task} board={board} group={group} setTaskEditExpand={setTaskEditExpand} style={style} />
            </>}
        </div>
    )
}

