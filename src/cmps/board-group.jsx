import { TaskList } from "./task-list"

export const BoardGroup = ({ group, boardId, groupId }) => {

    return <article className="board-group flex column">
        <div className="group-header">
            {group.title}
        </div>
        <TaskList tasks={group.tasks} boardId={boardId} groupId={groupId} />
    </article>
}