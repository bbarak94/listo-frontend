import { TaskPreview } from "./task-preview"

export const TaskList = ({ tasks, boardId, groupId, setTaskEditExpand }) => {

    return (
        <section className="task-list">
            {tasks.map(task =>
                <TaskPreview
                    task={task}
                    key={task.id}
                    boardId={boardId}
                    groupId={groupId}
                    setTaskEditExpand={setTaskEditExpand}
                />
            )}
        </section>
    )
}