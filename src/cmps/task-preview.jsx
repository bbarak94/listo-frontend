import { Link } from "react-router-dom"


export const TaskPreview = ({ task, boardId, setTaskOpen }) => {

    return (
        <Link to={`/board/${boardId}/task/${task.id}`}>
            <div className="task-preview" onClick={() => setTaskOpen(true)}>
                {task.title}
            </div>
        </Link>
    )
}