import { TaskPreview } from "./task-preview"

export const TaskList = ({boardId, group, setTaskEditExpand }) => {

    return (
        <section className="task-list">
            {group.tasks.map(task =>
                <TaskPreview
                    task={task}
                    key={task.id}
                    boardId={boardId}
                    group={group}
                    setTaskEditExpand={setTaskEditExpand}
                />
            )}
        </section>
    )
}