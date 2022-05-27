import { TaskPreview } from './task-preview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../store/actions/board.action'

export const TaskList = ({ board, group, setTaskEditExpand }) => {
    const dispatch = useDispatch()

    const handleOnDragEnd = (result) => {
        const orderedTasks = [...group.tasks]
        const [reorderedTask] = orderedTasks.splice(result.source.index, 1)
        orderedTasks.splice(result.destination.index, 0, reorderedTask)
        let newGroup = {...group}
        newGroup.tasks = orderedTasks
        dispatch(updateGroup(newGroup, board._id))
    }

    // if (!task.archivedAt) {
    //     return <TaskPreview
    //         task={task}
    //         key={task.id}
    //         boardId={boardId}
    //         group={group}
    //         setTaskEditExpand={setTaskEditExpand}
    //     />
    // }

    return (
        // <section className='task-list'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='task-list'>
                {(provided) => (
                    <ul
                        className='task-list'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {group.tasks.map((task, index) => {
                            if (!task.archivedAt)
                                return (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <li
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <TaskPreview
                                                    task={task}
                                                    // key={task.id}
                                                    board={board}
                                                    group={group}
                                                    setTaskEditExpand={
                                                        setTaskEditExpand
                                                    }
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
        </DragDropContext>
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
