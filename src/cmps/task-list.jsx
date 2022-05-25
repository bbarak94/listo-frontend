import { TaskPreview } from "./task-preview"

export const TaskList = ({ tasks, boardId, setTaskOpen }) => {

    return (
        <section className="task-list">
            {tasks.map(task =>
                <TaskPreview task={task} key={task.id} boardId={boardId} setTaskOpen={setTaskOpen} />
            )}
            
        </section>
    )
}