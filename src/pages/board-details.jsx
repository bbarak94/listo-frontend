import { useEffect, useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { BoardGroup } from '../cmps/board-group'
import { AddGroup } from '../cmps/add-group'
import { BoardHeaderNavBar } from '../cmps/board-header-nav-bar'
import { AppModal } from '../cmps/app-modal'
import { AppHeader } from '../cmps/app-header'

import { boardService } from '../services/board.service'
import { updateGroup, setBoard, saveBoard , updateBoardToStore } from '../store/actions/board.action'
import { socketService, SOCKET_EVENT_UPDATE_BOARD } from '../services/socket.service'


export const BoardDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { board } = useSelector((storeState) => storeState.boardModule)

    const [expandCardTitleGroupId, setExpandCardTitleId] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(null)
    const [modalPosition, setModalPosition] = useState({})
    const [labelExpandClass, setLabelExpand] = useState('')
    const [taskEditExpandId, setTaskEditExpand] = useState(null)
        
    // useEffect(() => {
    //     socketService.emit('board topic', params.boardId);
    //     socketService.off(SOCKET_EVENT_LOAD_BOARD);
    //     socketService.on(SOCKET_EVENT_LOAD_BOARD, loadBoard);
    //     return () => {
    //         socketService.off(SOCKET_EVENT_LOAD_BOARD, loadBoard)
    //         socketService.terminate()
    //     }
    // }, [board])
    
        useEffect(() => {
            loadBoard()
        }, [params.boardId])

    useEffect(() => {
        socketService.emit('shared board', params.boardId);
        socketService.off(SOCKET_EVENT_UPDATE_BOARD);
        socketService.on(SOCKET_EVENT_UPDATE_BOARD, setBoardFromSocket);
        return () => {
            // socketService.off(SOCKET_EVENT_LOAD_BOARD, loadBoard)
            socketService.terminate()
        }
    }, [])

    function setBoardFromSocket(board){
            console.log('setBoardFromSocket ~ board', board)
            dispatch(updateBoardToStore(board))
    }
    
    function loadBoard(){
        dispatch(setBoard(params.boardId))
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
            const group = boardService.getGroupById(board, result.draggableId)
            const newBoard = { ...board }
            newBoard.groups.splice(result.source.index, 1)
            newBoard.groups.splice(result.destination.index, 0, group)
            dispatch(saveBoard(newBoard))
            return
        }
        if (result.type === 'task') {
            const { currGroup: sourceGroup } =
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
        let elemRect = ev.currentTarget.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.currentTarget.offsetHeight
        top += height
        setModalPosition({ top, left })
    }

    if (!board) return <div>Loading...</div>
    return <section
        className='board-app cover-img flex column'
        style={{
            backgroundImage: `url(${board.style.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: board.style.background,
        }} >
        <AppHeader />

        <div className='board-header flex'>
            <BoardHeaderNavBar board={board} />
        </div>
        <main className='board-details flex'>
            <DragDropContext
                onDragEnd={handleOnDragEnd}>
                <Droppable droppableId={board._id} direction="horizontal" type='group'>
                    {(provided) => (
                        <div className='flex'   {...provided.droppableProps} ref={provided.innerRef}  >
                            {board.groups.map((group, index) => (
                                <div key={group.id} index={index} >
                                    <Draggable key={group.id} draggableId={group.id} index={index} type='group'
                                        isDragDisabled={taskEditExpandId ? true : false} pointerEvents='none'  >
                                        {(provided) => (
                                            <div ref={provided.innerRef} key={group.id}
                                                {...provided.draggableProps}  {...provided.dragHandleProps} >
                                                <BoardGroup
                                                    group={group}
                                                    board={board}
                                                    expandCardTitleGroupId={expandCardTitleGroupId}
                                                    labelExpandClass={labelExpandClass}
                                                    taskEditExpandId={taskEditExpandId}
                                                    onOpenModal={onOpenModal}
                                                    setExpandCardTitleId={setExpandCardTitleId}
                                                    setLabelExpand={setLabelExpand}
                                                    setTaskEditExpand={setTaskEditExpand} />
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
        <AppModal isOpen={isOpen} setIsOpen={setIsOpen}
            cmpType={cmpType} member={member}
            position={modalPosition} />
    </section>
}
