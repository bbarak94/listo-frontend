import { useEffect, useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setBoard } from '../store/actions/board.action'

import { BoardGroup } from '../cmps/board-group'
import { AddGroup } from '../cmps/add-group'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { boardService } from '../services/board.service'
import { updateGroup, saveBoard } from '../store/actions/board.action'
export const BoardDetails = () => {
    const [expandCardTitleGroupId, setExpandCardTitleId] = useState('')

    const params = useParams()
    const { board } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId } = result
        const draggedTaskId = draggableId
        const { currGroup, currTask } = boardService.getTaskAndGroup(
            board,
            draggedTaskId
        )
        const sourceGroup = currGroup
        const sourceGroupId = source.droppableId
        const destinationGroupId = destination.droppableId
        const sourceNewTasks = [...sourceGroup.tasks]
        const [draggedTask] = sourceNewTasks.splice(source.index, 1)
        if (sourceGroupId === destinationGroupId) {
            sourceNewTasks.splice(destination.index, 0, draggedTask)
            let newSourceGroup = { ...sourceGroup }
            newSourceGroup.tasks = sourceNewTasks
            dispatch(updateGroup(newSourceGroup, board._id))
        }
        
        if (sourceGroupId !== destinationGroupId) {
            // sourceNewTasks.splice(source.index, 1)
            const destinationGroup = boardService.getGroupById(
                board,
                destinationGroupId
                )
                let newSourceGroup = { ...sourceGroup }
                newSourceGroup.tasks = sourceNewTasks
                const destinationNewTasks = [...destinationGroup.tasks]
                destinationNewTasks.splice(destination.index, 0, draggedTask)
                let newDestinationGroup = { ...destinationGroup }
                newDestinationGroup.tasks = destinationNewTasks
                const newBoard = {...board}
                newBoard.groups.map(group =>{
                    if (group.id===sourceGroupId) group.tasks=sourceNewTasks
                    if (group.id===destinationGroupId) group.tasks=destinationNewTasks           
                })
                dispatch(saveBoard(newBoard))
                
            }
    }

    useEffect(() => {
        loadBoard()
    }, [params.boardId])

    const loadBoard = async () => {
        dispatch(setBoard(params.boardId))
    }

    if (!board) return <div>Loading...</div>

    return (
        <main className='board-details flex' style={{background: `url(${board.style.bgImage})`,backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: board.style.bgColor}}>
            <DragDropContext
                // onDragEnd={handleOnDragEnd}
                onDragEnd={handleOnDragEnd}
            >
                {board.groups.map((group) => (
                    <BoardGroup
                        group={group}
                        key={group.id}
                        board={board}
                        expandCardTitleGroupId={expandCardTitleGroupId}
                        setExpandCardTitleId={setExpandCardTitleId}
                    />
                ))}
            </DragDropContext>

            <AddGroup />
            <Outlet />
        </main>
    )
}
