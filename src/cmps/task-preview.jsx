import { useState } from "react"
import { Link } from "react-router-dom"

import { TaskEdit } from './task-edit'
import { Screen } from "./screen"

import moment from 'moment'

import dates from '../assets/img/task/navbar/dates.svg'

export const TaskPreview = ({ task, boardId, groupId }) => {

    const [isTaskEditExpand, setTaskEditExpand] = useState(false)

    const onOpenTaskEdit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setTaskEditExpand(true)
    }

    const taskBorderRadius = (task.style.color || task.style.imgUrl) ? '0 0 3px 3px' : '3px'

    // const he
    // task.dueDate ? 
    const taskHeight = task.dueDate ? '60' : '32 '

    return (
        <section style={{ position: 'relative' }}>
            <Link to={`/board/${boardId}/task/${task.id}`}>
                <div className="task-preview-container flex column">
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
                            <div className="task-preview-date flex">
                                {/* <div className="date-img-container"> */}
                                    <img src={dates} alt="" />
                                    {/* </div> */}
                                <span>{moment(task.dueDate).format('MMMM D')}</span>
                            </div>
                        }
                    </div>
                </div>
            </Link>
            {isTaskEditExpand && <TaskEdit task={task} boardId={boardId} groupId={groupId} setTaskEditExpand={setTaskEditExpand} />}
            {isTaskEditExpand && <Screen cb={() => setTaskEditExpand(false)} />}
        </section>
    )
}