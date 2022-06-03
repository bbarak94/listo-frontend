import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskPreview } from './task-preview'

export const TaskList = ({ board, group, onOpenModal, setIsScrollBar, setLabelExpand, labelExpandClass, 
    setTaskEditExpand, taskEditExpandId, titleLabelClass, setLabelTitleDelay}) => {

    const tasksToShow = group.tasks.filter((task) => !task.archivedAt)

    return (
        <Droppable droppableId={group.id} direction="vertical" type='task'>

            {(provided) => (
                <ul
                    className='task-list'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {tasksToShow.map((task, index) => {
                        return (
                            <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                                isDragDisabled={taskEditExpandId ? true : false}
                                type="task"
                            >
                                {(provided) => (
                                    <li {...provided.draggableProps}
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
                                    </li>
                                )}
                            </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    )
}
