import { Droppable, Draggable } from 'react-beautiful-dnd'

import { TaskPreview } from '../task-preview/task-preview'

export const TaskList = ({ board, filterBy, group, onOpenModal, setIsScrollBar, setLabelExpand, labelExpandClass,
    setTaskEditExpand, taskEditExpandId, titleLabelClass, setLabelTitleDelay }) => {

    const getTasksToShow = () => {
        var filteredTasks = group.tasks.filter((task) => !task.archivedAt)

        if (filterBy.txt !== '') {
            const regex = new RegExp(filterBy.txt, 'i')
            filteredTasks = filteredTasks.filter(
                (task) => regex.test(task.title)
            )
        }
        if (filterBy.memberIds.length) {
            console.log('filterBy.memberIds:', filterBy.memberIds)
            filteredTasks = filteredTasks.filter(task => {
                return task.memberIds.find(memberId => {
                    return filterBy.memberIds.includes(memberId)
                })
            })
        }
        return filteredTasks
    }
    return (
        <Droppable droppableId={group.id} direction="vertical" type='task'>
            {(provided) => (
                <article
                    className='task-list'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {getTasksToShow().map((task, index) => {
                        return (
                            <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                                isDragDisabled={taskEditExpandId ? true : false}
                                type="task"
                            >
                                {(provided) => (
                                    <div {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <TaskPreview
                                            onOpenModal={onOpenModal}
                                            task={task}
                                            board={board}
                                            group={group}
                                            setTaskEditExpand={setTaskEditExpand}
                                            taskEditExpandId={taskEditExpandId}
                                            setIsScrollBar={setIsScrollBar}
                                            setLabelExpand={setLabelExpand}
                                            labelExpandClass={labelExpandClass}
                                            titleLabelClass={titleLabelClass}
                                            setLabelTitleDelay={setLabelTitleDelay}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </article>
            )}
        </Droppable>
    )
}
