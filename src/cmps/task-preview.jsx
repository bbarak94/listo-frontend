import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { TaskEdit } from './task-edit'
import { Screen } from "./screen"

import moment from 'moment'

import clock from '../assets/img/task/navbar/dates.svg'
import checkBox from '../assets/img/checkbox.svg'

import { setTask } from "../store/actions/board.action"

export const TaskPreview = ({ task, board, group }) => {

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
                    {task.style.color &&
                        <div className="task-preview-color" style={{ backgroundColor: task.style.color }}>
                        </div>
                    }
                    {task.style.imgUrl &&
                        <div className="task-preview-img-container">
                            <img src={task.style.imgUrl} />
                        </div>
                    }
                    <div className="task-preview">
                        <div className="flex space-between" style={{ borderRadius: taskBorderRadius }}>
                            <span className="task-preview-title">{task.title}</span>
                            <p className="edit-icon" onClick={onOpenTaskEdit}></p>
                        </div>
                        {task.dueDate &&
                            <div className="task-preview-date flex"
                                onMouseOver={() => setIsMouseOver(true)}
                                onMouseOut={() => setIsMouseOver(false)}
                            >
                                {!isMouseOver && <img src={clock} alt="" />}
                                {isMouseOver && <img src={checkBox} alt="" />}
                                <span>{moment(task.dueDate).format('MMMM D')}</span>
                            </div>
                        }
                    </div>
                </div>
            </Link>
            {isTaskEditExpand && <TaskEdit task={task} board={board} group={group} setTaskEditExpand={setTaskEditExpand} />}
            {isTaskEditExpand && <Screen cb={() => setTaskEditExpand(false)} />}
        </section>
    )
}