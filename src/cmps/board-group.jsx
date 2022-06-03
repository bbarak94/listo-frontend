import { TaskList } from "./task-list"
import { AddTask } from "./add-task"
import { GroupTitleEdit } from "./group-title-edit"

export const BoardGroup = ({ group, board, expandCardTitleGroupId, setExpandCardTitleId, onOpenModal,
    labelExpandClass, setLabelExpand, setTaskEditExpand, taskEditExpandId, titleLabelClass, setLabelTitleDelay }) => {

    return (
        <>
            <article className="board-group flex column">
                <GroupTitleEdit
                    groupTitle={group.title}
                    group={group}
                    boardId={board._id}
                />
                <TaskList
                    onOpenModal={onOpenModal}
                    board={board}
                    group={group}
                    setLabelExpand={setLabelExpand}
                    labelExpandClass={labelExpandClass}
                    setTaskEditExpand={setTaskEditExpand}
                    taskEditExpandId={taskEditExpandId}
                    titleLabelClass={titleLabelClass}
                    setLabelTitleDelay={setLabelTitleDelay}
                />
                <AddTask
                    setExpandCardTitleId={setExpandCardTitleId}
                    expandCardTitleGroupId={expandCardTitleGroupId}
                    groupId={group.id}
                    boardId={board._id}
                />
            </article>
        </>
    )
}