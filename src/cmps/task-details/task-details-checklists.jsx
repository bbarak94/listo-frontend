import { TaskDetailsChecklist } from './task-details-checklist'
export const TaskDetailsChecklists = ({ task, board, groupId }) => {
    return (
        <>
            {task.checklists.map((checklist, idx) => {
                return (
                    <TaskDetailsChecklist
                        key={idx}
                        checklist={checklist}
                        task={task}
                        board={board}
                        groupId={groupId}
                    />
                )
            })}
        </>
    )
}
