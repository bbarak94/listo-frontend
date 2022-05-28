import { useEffect, useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { setBoard } from '../store/actions/board.action'

import { BoardGroup } from '../cmps/board-group'
import { AddGroup } from '../cmps/add-group'
import { BoardHeaderNavBar } from '../cmps/board-header-nav-bar'
import { AppModal } from '../cmps/app-modal'

import { boardService } from '../services/board.service'
import { updateGroup, saveBoard } from '../store/actions/board.action'
export const BoardDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const [expandCardTitleGroupId, setExpandCardTitleId] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(null)

    const { board } = useSelector((storeState) => storeState.boardModule)

    useEffect(() => {
        loadBoard()
    }, [params.boardId])

    const loadBoard = async () => {
        dispatch(setBoard(params.boardId))
    }

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
            const newBoard = { ...board }
            newBoard.groups.map(group => {
                if (group.id === sourceGroupId) group.tasks = sourceNewTasks
                if (group.id === destinationGroupId) group.tasks = destinationNewTasks
            })
            dispatch(saveBoard(newBoard))

        }
    }

    const onOpenModal = (type, member) => {
        setIsOpen(true)
        setCmpType(type)
        setMember(member)
    }

    if (!board) return <div>Loading...</div>
    console.log('board', board)
    return (
        <section className='flex column'
            style={{
                backgroundImage: `url(${board.style.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: board.style.background
            }}>

            <div className="board-header flex">
                <BoardHeaderNavBar board={board} onOpenModal={onOpenModal} />
            </div>

            <main className='board-details flex'>

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
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                member={member}
            />
        </section>
    )
}
