import { TaskList } from "./task-list"

export const BoardGroup = ({ group, boardId, setTaskOpen }) => {

    return <article className="board-group flex column">
        <div className="group-header">
            {group.title}
        </div>
        <TaskList tasks={group.tasks} boardId={boardId} setTaskOpen={setTaskOpen}/>
    </article>
}