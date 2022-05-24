import {
    TaskPreview
} from "./task-preview"
export const TaskList = ({ tasks }) => {

    console.log('tasks', tasks)

    return (
        <section className="task-list">
            {tasks.map(task =>
                <TaskPreview task={task} key={task.id}/>
            )}
        </section>
    )
}