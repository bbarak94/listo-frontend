import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp'

import { getBoard } from '../store/actions/board.action'
import { boardService } from '../services/board.service'
import { AppModal } from '../cmps/app-modal'

import close from '../assets/img/workspace/close.svg'
import archive from '../assets/img/task/navbar/archive.svg'

import { Screen } from '../cmps/screen'
import { TaskNavBar } from '../cmps/task-nav-bar.jsx'
import { MembersList } from '../cmps/dynamic-cmps/members-list.jsx'
import { DatePreview } from '../cmps/dynamic-cmps/date-preview'
import { LabelPreview } from '../cmps/label-preview'
import { TaskDetailsDesc } from '../cmps/task-details-desc'
import { TaskDetailsAttachments } from '../cmps/task-details-attachments.jsx'
import { TaskDetailsChecklists } from '../cmps/task-details-checklists.jsx'
import { TaskDetailsActivities } from '../cmps/task-details-activities.jsx'

export const TaskDetails = () => {
    const { boardId, taskId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { board } = useSelector((storeState) => storeState.boardModule)
    const currGroupRef = useRef(null)

    const [task, setTask] = useState(null)

    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(null)
    const [position, setPosition] = useState({})

    const onOpenModal = (ev, type, member) => {
        setIsOpen(true)
        setCmpType(type)
        setMember(member)

        let elemRect = ev.target.parentNode.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.target.offsetHeight
        setPosition({ top, left, height })
    }

    useEffect(() => {
        loadBoard()
    }, [])

    useEffectUpdate(() => {
        const { currGroup, currTask } = boardService.getTaskAndGroup(
            board,
            taskId
        )
        setTask(currTask)
        currGroupRef.current = currGroup
    }, [board])

    const loadBoard = async () => {
        dispatch(getBoard(boardId))
    }

    const onCloseTaskDetails = (ev) => {
        navigate(`/board/${boardId}`)
    }

    if (!task) return <h1>Loading...</h1>
  
    return (
        <>
            <Screen cb={onCloseTaskDetails} />
            <div className='task-details flex column'>
                {task.style.color && (
                    <div
                        style={{ backgroundColor: task.style.color }}
                        className='task-details-cover-color'
                    ></div>
                )}
                {task.style.imgUrl && (
                    <div className='task-details-cover-img'>
                        <div className='cover-img-container'>
                            <img src={task.style.imgUrl} alt='' />
                        </div>
                    </div>
                )}
                {task.archivedAt && (
                    <div className='task-archived-indication'>
                        <img
                            src={archive}
                            alt='Custom Fields'
                            style={{ width: '18px' }}
                        />
                        <p>This card is archived.</p>
                    </div>
                )}
                <div className='task-details-header flex'>
                    <div className='flex left-side'>
                        <CreditCardSharpIcon className='credit-card-icon' />
                        <div className='title flex column'>
                            <h1>{task.title}</h1>
                            <h2>
                                in list{' '}
                                <span>{currGroupRef.current.title}</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className='inner-container'>
                    <div
                        className='icon-container close flex'
                        onClick={onCloseTaskDetails}
                    >
                        <img
                            src={close}
                            alt='close'
                            style={{ width: '21px' }}
                        />
                    </div>
                    <div className='task-main-layout flex'>
                        <div className='task-details-content flex column'>
                            <div className='upper-content flex'>
                                {task.memberIds && (
                                    <MembersList
                                        board={board}
                                        task={task}
                                        onOpenModal={onOpenModal}
                                    />
                                )}
                                {task.labelIds && (
                                    <LabelPreview
                                        board={board}
                                        task={task}
                                        onOpenModal={onOpenModal}
                                    />
                                )}
                                {task.dueDate && (
                                    <DatePreview
                                        board={board}
                                        task={task}
                                        onOpenModal={onOpenModal}
                                    />
                                )}
                            </div>
                            <TaskDetailsDesc
                                task={task}
                                boardId={boardId}
                                groupId={currGroupRef.current.id}
                            />
                            <TaskDetailsAttachments
                                task={task}
                                boardId={boardId}
                                groupId={currGroupRef.current.id}
                            />
                            <TaskDetailsChecklists
                                task={task}
                                board={board}
                                groupId={currGroupRef.current.id}
                                onOpenModal={onOpenModal}
                            />
                            <TaskDetailsActivities
                                task={task}
                                board={board}
                                groupId={currGroupRef.current.id}
                            />
                        </div>
                        <TaskNavBar
                            board={board}
                            group={currGroupRef.current}
                            task={task}
                            onOpenModal={onOpenModal}
                        />
                    </div>
                </div>
            </div>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                task={task}
                board={board}
                group={currGroupRef.current}
                member={member}
                position={position}
            />
        </>
    )
}
