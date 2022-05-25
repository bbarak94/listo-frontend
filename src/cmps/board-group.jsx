import { useState } from "react"
import { TaskList } from "./task-list"

export const BoardGroup = ({ group, boardId, groupId }) => {

    const [isAddCardExpand, setCardExpand] = useState(false)

    return <article className="board-group flex column">
        <div className="group-header">
            {group.title}
        </div>
        <TaskList tasks={group.tasks} boardId={boardId} groupId={groupId} />
        <div>
            <div className="add-card flex align-center" onClick={() => setCardExpand(true)}>
                <span className="add-icon"></span>
                <span className="add-card-txt">Add a card</span>
            </div>
            <textarea name="" id="" cols="" rows=""></textarea>
        </div>
    </article>
}