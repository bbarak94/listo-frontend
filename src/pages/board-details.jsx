import { useEffect, useRef, useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import loader from '../assets/img/loader.svg'

import { BoardGroup } from '../cmps/board/board-group'
import { AddGroup } from '../cmps/board/add-group'
import { BoardHeader } from '../cmps/headers/board-header'
import { AppModal } from '../cmps/app-modal'
import { AppHeader } from '../cmps/headers/app-header'

import { boardService } from '../services/board.service'
import { updateGroup, setBoard, saveBoard, updateBoardToStore } from '../store/actions/board.action'
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
    const [titleLabelClass, setTitleLabelClass] = useState('')

    var timeoutId
    const boardRef = useRef()

    const setLabelTitleDelay = (className) => {
        if (className === 'expand') {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                setTitleLabelClass('titleShow')
            }, 270)
        } else {
            setTitleLabelClass('titleHide')
        }
    }

    useEffect(() => {
        loadBoard()
        console.log('test')
    }, [params.boardId])

    function loadBoard() {
        dispatch(setBoard(params.boardId))
    }

    useEffect(() => {
        socketService.emit('shared board', params.boardId);
        socketService.off(SOCKET_EVENT_UPDATE_BOARD);
        socketService.on(SOCKET_EVENT_UPDATE_BOARD, setBoardFromSocket);
        return () => {
            socketService.off(SOCKET_EVENT_UPDATE_BOARD, loadBoard)
        }
    }, [])

    function setBoardFromSocket(board) {
        dispatch(updateBoardToStore(board))
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

            const newBoard = structuredClone(board)
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
                let destinationGroup = boardService.getGroupById(board, destinationGroupId)
                destinationGroup = structuredClone(destinationGroup)
                let newSourceGroup = structuredClone(sourceGroup)

                newSourceGroup.tasks = sourceNewTasks
                const destinationNewTasks = [...destinationGroup.tasks]
                destinationNewTasks.splice(destinationIdx, 0, draggedTask)
                const newBoard = structuredClone(board)

                newBoard.groups.map((group) => {
                    if (group.id === sourceGroupId) group.tasks = sourceNewTasks
                    if (group.id === destinationGroupId)
                        group.tasks = destinationNewTasks
                })
                dispatch(saveBoard(newBoard))
            }
        }
    }

    if (!board) return <img className='loader' src={loader} alt='Loading...' />

    return <section
        className='board-app cover-img board-cover-img flex column'
        style={{
            backgroundImage: `url(${board.style.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: board.style.background,
        }} >
        <AppHeader />

        <div className='board-header flex'>
            <BoardHeader board={board} setLabelExpand={setLabelExpand} setTitleLabelClass={setTitleLabelClass}
                setLabelTitleDelay={setLabelTitleDelay} titleLabelClass={titleLabelClass} />
        </div>
        <main className='board-details flex' ref={boardRef} >
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
                                                    titleLabelClass={titleLabelClass}
                                                    onOpenModal={onOpenModal}
                                                    setExpandCardTitleId={setExpandCardTitleId}
                                                    setLabelExpand={setLabelExpand}
                                                    setTaskEditExpand={setTaskEditExpand}
                                                    setLabelTitleDelay={setLabelTitleDelay}
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
        <AppModal isOpen={isOpen} setIsOpen={setIsOpen}
            cmpType={cmpType} member={member}
            position={modalPosition} />
    </section>
}
