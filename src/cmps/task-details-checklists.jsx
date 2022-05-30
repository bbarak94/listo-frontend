import { TaskDetailsChecklist } from './task-details-checklist'
export const TaskDetailsChecklists = ({ task, boardId, groupId }) => {
    return (
        <>
            {task.checklists.map((checklist, idx) => {
                return (
                    <TaskDetailsChecklist
                        key={idx}
                        checklist={checklist}
                        task={task}
                        boardId={boardId}
                        groupId={groupId}
                    />
                )
            })}
        </>
    )
}
