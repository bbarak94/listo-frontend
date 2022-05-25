import { TaskList } from "./task-list"
import { AddTask } from "./add-task"

export const BoardGroup = ({ group, boardId, setExpandShownId, expandShownGroupId }) => {

    return <article className="board-group flex column">
        <div className="group-header">
            {group.title}
        </div>
        <TaskList
            tasks={group.tasks}
            boardId={boardId}
        />
        <AddTask
            setExpandShownId={setExpandShownId}
            expandShownGroupId={expandShownGroupId}
            groupId={group.id}
            boardId={boardId}
        />
    </article>
}