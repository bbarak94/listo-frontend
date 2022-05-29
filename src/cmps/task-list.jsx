import { TaskPreview } from './task-preview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../store/actions/board.action'
import { useEffect, useRef, useState } from 'react'

export const TaskList = ({ board, group, onOpenModal, setTask }) => {
    const dispatch = useDispatch()

    const [taskEditExpandId, setTaskEditExpand] = useState(null)

    // const tasksRef = useRef([])


    // useEffect(() => {
    //     tasksRef.current = group.tasks.filter(task=> !task.archivedAt)
    // }, [board])

    // const handleOnDragEnd = (result) => {
    //     const orderedTasks = [...group.tasks]
    //     const [reorderedTask] = orderedTasks.splice(result.source.index, 1)
    //     orderedTasks.splice(result.destination.index, 0, reorderedTask)
    //     let newGroup = { ...group }
    //     newGroup.tasks = orderedTasks
    //     dispatch(updateGroup(newGroup, board._id))
    // }

    const tasksToShow = group.tasks.filter((task) => !task.archivedAt)
    return (
        // <section className='task-list'>
        // <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={group.id}>
            {/* <Droppable droppableId='task-list'> */}
            {(provided) => (
                <ul
                    // style={{maxHeight: '660px', overflow: 'auto'}}
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
                                isDragDisabled={taskEditExpandId}
                            >
                                {(provided) => (
                                    <li
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <TaskPreview
                                            onOpenModal={onOpenModal}
                                            task={task}
                                            // key={task.id}
                                            board={board}
                                            group={group}
                                            setTaskEditExpand={setTaskEditExpand}
                                            taskEditExpandId={taskEditExpandId}
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
        // </DragDropContext>
        // </section>
    )
}

// import { TaskPreview } from "./task-preview"

// export const TaskList = ({boardId, group, setTaskEditExpand }) => {

//     return (
//         <section className="task-list">
//             {group.tasks.map(task =>
//                 <TaskPreview
//                     task={task}
//                     key={task.id}
//                     boardId={boardId}
//                     group={group}
//                     setTaskEditExpand={setTaskEditExpand}
//                 />
//             )}
//         </section>
//     )
// }
