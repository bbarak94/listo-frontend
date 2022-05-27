import { TaskPreview } from './task-preview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const TaskList = ({ board, group, setTaskEditExpand }) => {
    const handleOnDragEnd = (result) => {
        console.log('result:', result)
        console.log('I moved task:', result.draggableId)
        console.log('from index:',result.source.index)
        console.log('to index:', result.destination.index)
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
                                if (!task.archivedAt)  return (
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
