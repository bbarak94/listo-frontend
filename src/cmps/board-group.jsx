import { TaskList } from "./task-list"
import { AddTask } from "./add-task"
import { GroupTitleEdit } from "./group-title-edit"

export const BoardGroup = ({ group, boardId, expandCardTitleGroupId, setExpandCardTitleId, setTaskEditExpand }) => {

    return <article className="board-group flex column">
        <GroupTitleEdit
            groupTitle={group.title}
            groupId={group.id}
            boardId={boardId}
        />
        <TaskList
            tasks={group.tasks}
            boardId={boardId}
            groupId={group.id}
            setTaskEditExpand={setTaskEditExpand}
        />
        <AddTask
            setExpandCardTitleId={setExpandCardTitleId}
            expandCardTitleGroupId={expandCardTitleGroupId}
            groupId={group.id}
            boardId={boardId}
        />
    </article>
}