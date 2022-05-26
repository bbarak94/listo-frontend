import { useState } from "react"
import { Link } from "react-router-dom"

import { TaskEdit } from './task-edit'
import { Screen } from "./screen"

export const TaskPreview = ({ task, boardId, groupId }) => {

    const [isTaskEditExpand, setTaskEditExpand] = useState(false)
    console.log(boardId);

    const onOpenTaskEdit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setTaskEditExpand(true)
    }
    return (
        <>
            <Link to={`/board/${boardId}/task/${task.id}`}>
                <div className="task-preview">
                    <span className="task-preview-title">{task.title}</span>
                    <p className="edit-icon" onClick={onOpenTaskEdit}></p>
                </div>
            </Link>
            {isTaskEditExpand && <TaskEdit task={task} boardId={boardId} groupId={groupId} setTaskEditExpand={setTaskEditExpand} />}
            {isTaskEditExpand && <Screen cb={() => setTaskEditExpand(false)} />}
        </>
    )
}