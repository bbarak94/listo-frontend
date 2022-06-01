import { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { TaskEdit } from './task-edit'
import { Screen } from './screen'

import clock from '../assets/img/task/navbar/dates.svg'
import checkBox from '../assets/img/checkbox.svg'

import { labelService } from "../services/label.service"
import { boardService } from "../services/board.service"

const NO_COLOR_INDICATION = '#B3BAC5'

export const TaskPreview = ({ task, board, group, onOpenModal, setTaskEditExpand, taskEditExpandId, setLabelExpand, labelExpandClass }) => {

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
    }

    return (
        <div className="task-preview-helper">
            <Link to={`/board/${board._id}/task/${task.id}`}>
                <div className="task-preview-container flex column">

                    <div className="task-preview">
                        {task.style.color && <div className="task-preview-color" style={{ backgroundColor: task.style.color }}>
                            {task.style.isCoverSizeBig && <>
                                <span className='title-over-color'>{task.title}</span>
                                <p className='edit-icon-over-color' onClick={onOpenTaskEdit}></p>
                            </>}
                        </div>
                        }
                        {task.style.imgUrl &&
                            <div className="task-preview-img-container">
                                <img src={task.style.imgUrl} />{task.style.isCoverSizeBig && <>
                                    <span className='title-over-img'>{task.title}</span>
                                    <p className='edit-icon-over-img' onClick={onOpenTaskEdit}></p> </>}
                            </div>}

                        {(task.labelIds?.length > 0) && (
                            <div className='task-preview-labels flex'>
                                {labelService.getLabelsByIds(task.labelIds, board).map((label) => {
                                    return (label.color !== NO_COLOR_INDICATION && <div
                                        key={label.id} className={`task-preview-label ${labelExpandClass}`} onClick={onExpandLabels}
                                        style={{ backgroundColor: label.color, }} >
                                    </div>
                                    )
                                })}
                            </div>
                        )}

                        {!task.style.isCoverSizeBig && <div className='preview-title flex space-between'>
                            <div className='task-preview-title'>
                                <span >{task.title} </span>
                            </div>
                            <p className='edit-icon' onClick={onOpenTaskEdit}  ></p>
                        </div>}

                        {(task.memberIds?.length || task.labelIds?.length || task.dueDate) && (
                            <div className='flex space-between'>
                                {task.dueDate && (
                                    <div className='task-preview-date flex'
                                        onMouseOver={() => setIsMouseOver(true)}
                                        onMouseOut={() => setIsMouseOver(false)}
                                    >

                                        {!isMouseOver && <img src={clock} alt='' />}
                                        {isMouseOver && <img src={checkBox} alt='' />}

                                        <span>
                                            {moment(task.dueDate).format('MMMM D')}
                                        </span>
                                    </div>
                                )}

                                <div className='members-list-container flex column'>
                                    <div className='members-avatars-container-task-preview flex'>
                                        {boardService.getMembersByIds(task.memberIds, board)?.map((member) => {
                                            return (
                                                <div key={member.id} className='member-container flex'
                                                    onClick={(ev) => {
                                                        ev.preventDefault()
                                                        onOpenModal(ev, 'member', member)
                                                    }} >
                                                    <img src={member.imgUrl} />
                                                </div>)
                                        })}
                                    </div>
                                </div>
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
