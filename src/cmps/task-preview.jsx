import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { TaskEdit } from './task-edit'

export const TaskPreview = ({ task, boardId, groupId }) => {

    const [isTaskEditExpand, setTaskEditExpand] = useState(false)

    const onOpenTaskEdit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setTaskEditExpand(true)
    }

    return (
        <Fragment>
            <Link to={`/board/${boardId}/task/${task.id}`}>
                <div className="task-preview">
                    <span className="task-preview-title">{task.title}</span>
                    <p className="edit-icon" onClick={onOpenTaskEdit}></p>
                    {isTaskEditExpand && <TaskEdit task={task} boardId={boardId} groupId={groupId} />}
                    {/* <div className="screen-overlay"></div> */}
                </div>
            </Link>
        </Fragment>
    )
}