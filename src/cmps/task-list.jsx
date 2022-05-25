import { TaskPreview } from "./task-preview"

export const TaskList = ({ tasks, boardId }) => {

    return (
        <section className="task-list">
            {tasks.map(task =>
                <TaskPreview task={task} key={task.id} boardId={boardId}  />
            )}
        </section>
    )
}