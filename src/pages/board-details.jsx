// import { useEffect, useState } from 'react'
// import { useParams, Outlet } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import { setBoard } from '../store/actions/board.action'

// import { BoardGroup } from '../cmps/board-group'
// import { AddGroup } from '../cmps/add-group'

// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// export const BoardDetails = () => {
//     const [expandCardTitleGroupId, setExpandCardTitleId] = useState('')
//     const params = useParams()
//     const { board } = useSelector((storeState) => storeState.boardModule)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         loadBoard()
//     }, [params.boardId])

//     const loadBoard = async () => {
//         dispatch(setBoard(params.boardId))
//     }

//     const handleOnDragEnd = (result) => {
//         console.log('result:', result)
//         console.log('I moved task:', result.draggableId)
//         console.log('from index:', result.source.index)
//         console.log('to index:', result.destination.index)
//     }

//     if (!board) return <div>Loading...</div>

//     return (
//         // <main className="board-details flex">
//         <>
//             <DragDropContext onDragEnd={handleOnDragEnd}>
//                 <Droppable droppableId='board-details'>
//                     {(provided) => (
//                         <ul
//                             className='board-details flex'
//                             {...provided.droppableProps}
//                             ref={provided.innerRef}
//                         >
//                             {board.groups.map((group, index) => {
//                                 return (
//                                     <Draggable
//                                         key={group.id}
//                                         draggableId={group.id}
//                                         index={index}
//                                     >
//                                         {(provided) => (
//                                             <li
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 ref={provided.innerRef}
//                                             >
//                                                 <BoardGroup
//                                                     group={group}
//                                                     key={group.id}
//                                                     board={board}
//                                                     expandCardTitleGroupId={
//                                                         expandCardTitleGroupId
//                                                     }
//                                                     setExpandCardTitleId={
//                                                         setExpandCardTitleId
//                                                     }
//                                                 />
//                                             </li>
//                                         )}
//                                     </Draggable>
//                                 )
//                             })}
//                             <AddGroup />
//                             <Outlet />
//                         {provided.placeholder}
//                         </ul>
//                     )}
//                 </Droppable>
//             </DragDropContext>
//         </>
//     )
// }

import { useEffect, useState } from "react"
import { useParams, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { setBoard } from '../store/actions/board.action'

import { BoardGroup } from "../cmps/board-group"
import { AddGroup } from '../cmps/add-group'

export const BoardDetails = () => {
    const [expandCardTitleGroupId, setExpandCardTitleId] = useState('')

    const params = useParams()
    const { board } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        loadBoard()
    }, [params.boardId])

    const loadBoard = async () => {
        dispatch(setBoard(params.boardId))
    }

    if (!board) return <div>Loading...</div>

    return (

        <main className="board-details flex">
            {board.groups.map(group =>
                <BoardGroup
                    group={group}
                    key={group.id}
                    board={board}
                    expandCardTitleGroupId={expandCardTitleGroupId}
                    setExpandCardTitleId={setExpandCardTitleId}
                />
            )}
            <AddGroup />
            <Outlet />
        </main>

    )
}
