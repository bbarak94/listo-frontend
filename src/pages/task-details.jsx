import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp'

import { getBoard } from '../store/actions/board.action'
import { boardService } from '../services/board.service'

import close from '../assets/img/workspace/close.svg'
import archive from '../assets/img/task/navbar/archive.svg'

import { Screen } from '../cmps/screen'
import { TaskNavBar } from '../cmps/task-nav-bar.jsx'
import { MembersList } from '../cmps/dynamic-cmps/members-list.jsx'
import { DatePreview } from '../cmps/dynamic-cmps/date-preview'
import { LabelPreview } from '../cmps/label-preview'
import { TaskDetailsDesc } from '../cmps/task-details-desc'

export const TaskDetails = () => {
    const { boardId, taskId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { board } = useSelector((storeState) => storeState.boardModule)
    const [task, setTask] = useState(null)
    const currGroupRef = useRef(null)

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

    const onHandleScreenClick = () => {
        navigate(`/board/${boardId}`)
    }

    if (!task) return <h1>Loading...</h1>

    return (
        <>
            <Screen cb={onHandleScreenClick} />
            <div className='task-details flex column'>
                {!task.archivedAt && (
                    <div className='task-archived-indication'>
                        <img
                            src={archive}
                            alt='Custom Fields'
                            style={{ width: '18px' }}
                        />
                        <p>This card is archived.</p>
                    </div>
                )}

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
                <div className='icon-container close flex'>
                    <img src={close} alt='close' style={{ width: '21px' }} />
                </div>
                <div className='task-main-layout flex'>
                    <div className='task-details-content flex column'>
                        <div className='flex align-center'>
                            {task.memberIds && <MembersList board={board} task={task} />}
                            {task.labelIds && <LabelPreview board={board} task={task} />}
                            {task.dueDate && <DatePreview task={task} />}
                        </div>
                        <TaskDetailsDesc task={task} boardId={boardId} groupId={currGroupRef.current.id} />
                    </div>
                    <TaskNavBar board={board} group={currGroupRef.current} task={task} />
                </div>
            </div>
        </>
    )
}

