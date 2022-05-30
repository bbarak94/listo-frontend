import { useEffect, useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { updateGroup, saveBoard, setBoard } from '../store/actions/board.action'

import { BoardGroup } from '../cmps/board-group'
import { AddGroup } from '../cmps/add-group'
import { BoardHeaderNavBar } from '../cmps/board-header-nav-bar'
import { AppModal } from '../cmps/app-modal'
import { boardService } from '../services/board.service'
import { AppHeader } from '../cmps/app-header'

export const BoardDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const [expandCardTitleGroupId, setExpandCardTitleId] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(null)
    const [modalPosition, setModalPosition] = useState({})
    const [labelExpandClass, setLabelExpand] = useState('')

    const { board } = useSelector((storeState) => storeState.boardModule)


    useEffect(() => {
        loadBoard()
    }, [params.boardId])

    const loadBoard = async () => {
        dispatch(setBoard(params.boardId))
    }


    const handleOnDragStart = (ev) => {
        console.log('ev:',ev)
    }

    const onMouseDown = (ev) => {
        console.log('ev.target.parentNode:',ev.target.parentNode)
        // ev.target.parentNode.parentNode.style.transform = 'rotate(-12deg)'
    }
    const onMouseUp = (ev) => {
    }
    
    const handleOnDragEnd = (result) => {

        if (!result.destination) return

        const {
            source: { droppableId: sourceGroupId, index: sourceIdx },
            destination: {
                droppableId: destinationGroupId,
                index: destinationIdx,
            },
            draggableId: draggedTaskId,
        } = result
        if (result.type === 'group') {
            // console.log('result:', result)
            const group = boardService.getGroupById(board, result.draggableId)
            const newBoard = { ...board }
            newBoard.groups.splice(result.source.index, 1)
            newBoard.groups.splice(result.destination.index, 0, group)
            dispatch(saveBoard(newBoard))
            return
        }
        if (result.type === 'task') {
            const { currGroup: sourceGroup, currTask } =
                boardService.getTaskAndGroup(board, draggedTaskId)
            const sourceNewTasks = [...sourceGroup.tasks]
            const [draggedTask] = sourceNewTasks.splice(sourceIdx, 1)
            if (sourceGroupId === destinationGroupId) {
                sourceNewTasks.splice(destinationIdx, 0, draggedTask)
                let newSourceGroup = { ...sourceGroup }
                newSourceGroup.tasks = sourceNewTasks
                dispatch(updateGroup(newSourceGroup, board._id))
            }
            if (sourceGroupId !== destinationGroupId) {
                const destinationGroup = boardService.getGroupById(
                    board,
                    destinationGroupId
                )
                let newSourceGroup = { ...sourceGroup }
                newSourceGroup.tasks = sourceNewTasks
                const destinationNewTasks = [...destinationGroup.tasks]
                destinationNewTasks.splice(destinationIdx, 0, draggedTask)
                let newDestinationGroup = { ...destinationGroup }
                newDestinationGroup.tasks = destinationNewTasks
                const newBoard = { ...board }
                newBoard.groups.map((group) => {
                    if (group.id === sourceGroupId) group.tasks = sourceNewTasks
                    if (group.id === destinationGroupId)
                        group.tasks = destinationNewTasks
                })
                dispatch(saveBoard(newBoard))
            }
        }
    }

    const onOpenModal = (ev, type, member) => {
        setIsOpen(true)
        setCmpType(type)
        setMember(member)

        let elemRect = ev.target.parentNode.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.target.offsetHeight
        setModalPosition({ top, left, height })
    }

    const [taskEditExpandId, setTaskEditExpand] = useState(null)

    if (!board) return <div>Loading...</div>

    return (
        <section
            className='board-app cover-img flex column'
            style={{
                backgroundImage: `url(${board.style.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: board.style.background,
            }}
        >
            <AppHeader />

            <div className='board-header flex'>
                <BoardHeaderNavBar board={board} />
            </div>
            <main className='board-details flex'>
                <DragDropContext
                    onDragEnd={handleOnDragEnd}
                    // onDragStart={(ev) => handleOnDragStart(ev)}
                    onMouseDown={(ev)=> onMouseDown()}
                    onMouseUp={(ev)=> onMouseUp()}
                                    >
                    {/* //////////////////////////////// */}
                    {/* Droppable HERE */}
                    {/* direction horizontal */}
                    {/* id props provider */}


                    {/* DRAGABLE TYPE props group or task two line down in map */}
                    <Droppable droppableId={board._id} direction="horizontal" type='group'>
                        {(provided) => (
                            <div
                                className='flex'
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {board.groups.map((group, index) => (
                                    <div
                                        key={group.id}
                                        index={index}
                                    >
                                        <Draggable
                                            key={group.id}
                                            draggableId={group.id}
                                            index={index}
                                            type='group'
                                            isDragDisabled={taskEditExpandId ? true : false}
                                            pointerEvents= 'none'
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    key={group.id}
                                                    onMouseDown={onMouseDown}
                                                >
                                                    <BoardGroup
                                                        onOpenModal={onOpenModal}
                                                        group={group}
                                                        board={board}
                                                        expandCardTitleGroupId={expandCardTitleGroupId}
                                                        setExpandCardTitleId={setExpandCardTitleId}
                                                        labelExpandClass={labelExpandClass}
                                                        setLabelExpand={setLabelExpand}
                                                        setTaskEditExpand={setTaskEditExpand}
                                                        taskEditExpandId={taskEditExpandId}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <AddGroup />
                <Outlet />
            </main>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                member={member}
                position={modalPosition}
            />
        </section>
    )
}
