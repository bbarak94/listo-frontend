import { Link } from "react-router-dom"

export const TaskPreview = ({ task, boardId }) => {

    return (
        <Link to={`/board/${boardId}/task/${task.id}`}>
            <div className="task-preview">
                <span className="task-preview-title">{task.title}</span>
            </div>
        </Link>
    )
}