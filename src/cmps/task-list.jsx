import { TaskPreview } from "./task-preview"

export const TaskList = ({board, group, setTaskEditExpand }) => {

    return (
        <section className="task-list">
            {group.tasks.map(task =>
                <TaskPreview
                    task={task}
                    key={task.id}
                    board={board}
                    group={group}
                    setTaskEditExpand={setTaskEditExpand}
                />
            )}
        </section>
    )
}