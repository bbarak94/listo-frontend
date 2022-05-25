import { useRef } from "react"
import { TaskList } from "./task-list"

export const BoardGroup = ({ group, boardId, groupId, setExpandShownId, expandShownGroupId }) => {

    return <article className="board-group flex column">
        <div className="group-header">
            {group.title}
        </div>
        <TaskList tasks={group.tasks} boardId={boardId} groupId={groupId} />
        <div className="task-composer">
            {expandShownGroupId !== group.id && <div className="add-card flex align-center" onClick={() => setExpandShownId(group.id)}>
                <span className="add-icon"></span>
                <span className="add-card-txt">Add a card</span>
            </div>}
            {expandShownGroupId === group.id && <textarea autoFocus placeholder="Enter a title for this card..." />}
            {expandShownGroupId === group.id && <div className='add-group-actions flex'>
                <button className="btn">Add card</button>
                <span className="close-btn" onClick={() => setExpandShownId('')}></span>
            </div>}
        </div>
    </article>
}