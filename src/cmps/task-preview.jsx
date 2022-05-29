import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { TaskEdit } from './task-edit'
import { Screen } from "./screen"

import moment from 'moment'

import clock from '../assets/img/task/navbar/dates.svg'
import checkBox from '../assets/img/checkbox.svg'

import { setTask } from "../store/actions/board.action"
import { labelService } from "../services/label.service"
import { boardService } from "../services/board.service"

export const TaskPreview = ({ task, board, group, onOpenModal }) => {

    const [isTaskEditExpand, setTaskEditExpand] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(false)
    const dispatch = useDispatch()

    // useEffect(() => {
    // }, [])

    const onOpenTaskEdit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setTaskEditExpand(true)
    }

    const onSetTask = () => {
        dispatch(setTask(task))
    }

    const taskBorderRadius = (task.style.color || task.style.imgUrl) ? '0 0 3px 3px' : '3px'

    return (
        <section style={{ position: 'relative' }}>
            <Link to={`/board/${board._id}/task/${task.id}`}>
                <div className="task-preview-container flex column" onClick={onSetTask}>
                    <div className="task-preview">
                        {task.style.color && <div className="task-preview-color" style={{ backgroundColor: task.style.color }}>
                        </div>
                        }
                        {task.style.imgUrl && <div className="task-preview-img-container">
                            <img src={task.style.imgUrl} />
                        </div>
                        }

                        {task.labelIds && <div className="task-preview-labels flex" >
                            {labelService.getLabelsByIds(task.labelIds, board).map(l => {
                                return <div key={l.id} className="task-preview-label" style={{ backgroundColor: l.color }}>
                                </div>
                            })}
                        </div>}


                        {/* <div className='members-list-container flex column'>
                            <div className='members-avatars-container flex'>
                                {boardService.getMembersByIds(task.memberIds, board)?.map((member) => {
                                    return (
                                        <div key={member.id} className='member-container flex' onClick={(ev) => {
                                            ev.preventDefault()
                                            onOpenModal('member', member)}}>
                                            <img src={member.imgUrl} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>  */}

                        <div className="preview-title flex space-between" style={{ borderRadius: taskBorderRadius }}>
                            <span className="task-preview-title">{task.title}</span>
                            <p className="edit-icon" onClick={onOpenTaskEdit}></p>
                        </div>




                        <div className="flex space-between">
                            {task.dueDate && <div className="task-preview-date flex"
                                onMouseOver={() => setIsMouseOver(true)}
                                onMouseOut={() => setIsMouseOver(false)}
                            >
                                {!isMouseOver && <img src={clock} alt="" />}
                                {isMouseOver && <img src={checkBox} alt="" />}
                                <span>{moment(task.dueDate).format('MMMM D')}</span>
                            </div>}

                            <div className='members-list-container flex column'>
                                <div className='members-avatars-container-task-preview flex'>
                                    {boardService.getMembersByIds(task.memberIds, board)?.map((member) => {
                                        return (
                                            <div key={member.id} className='member-container flex' onClick={(ev) => {
                                                ev.preventDefault()
                                                onOpenModal('member', member)
                                            }}>
                                                <img src={member.imgUrl} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {isTaskEditExpand && <TaskEdit task={task} board={board} group={group} setTaskEditExpand={setTaskEditExpand} />}
            {isTaskEditExpand && <Screen cb={() => setTaskEditExpand(false)} />}
        </section>
    )
}