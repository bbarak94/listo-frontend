import { useState } from "react"
import { Link } from "react-router-dom"

import { TaskEdit } from './task-edit'
import { Screen } from "./screen"

export const TaskPreview = ({ task, boardId, groupId }) => {

    const [isTaskEditExpand, setTaskEditExpand] = useState(false)

    const onOpenTaskEdit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setTaskEditExpand(true)
    }

    const borderRadius = (task.style.color || task.style.imgUrl) ? '0 0 3px 3px' : '3px'

    return (
        <section style={{ position: 'relative' }}>
            <Link to={`/board/${boardId}/task/${task.id}`}>
                <div className="task-preview-container flex column">
                    {task.style.color && <div className="task-preview-color" style={{ backgroundColor: task.style.color }}></div>}
                    {task.style.imgUrl && <div className="task-preview-img"><img src={task.style.imgUrl} /></div>}
                    <div className="task-preview flex space-between" style={{ borderRadius: borderRadius }}>
                        <span className="task-preview-title">{task.title}</span>
                        <p className="edit-icon" onClick={onOpenTaskEdit}></p>
                    </div>
                </div>
            </Link>
            {isTaskEditExpand && <TaskEdit task={task} boardId={boardId} groupId={groupId} setTaskEditExpand={setTaskEditExpand} />}
            {isTaskEditExpand && <Screen cb={() => setTaskEditExpand(false)} />}
        </section>
    )
}