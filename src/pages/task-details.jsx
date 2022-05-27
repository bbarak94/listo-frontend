import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp'

import { getBoard } from '../store/actions/board.action'
import { boardService } from '../services/board.service'

import close from '../assets/img/workspace/close.svg'

import { Screen } from '../cmps/screen'
import { TaskNavBar } from '../cmps/task-nav-bar.jsx'
import { MembersList } from '../cmps/dynamic-cmps/members-list.jsx'
import { DatePreview } from '../cmps/dynamic-cmps/date-preview'

// import TaskMembers from '../cmps/task-members.jsx'
// import TaskLabels from '../cmps/task-labels.jsx'
// import TaskDates from '../cmps/task-dates.jsx'
// import TaskDescription from '../cmps/task-description.jsx'
// import TaskLocation from '../cmps/task-location.jsx'
// import TaskAttachments from '../cmps/task-attachments.jsx'
// import TaskChecklist from '../cmps/task-checklist.jsx'
// import TaskActivity from '../cmps/task-activity.jsx'
// import TaskCover from '../cmps/task-cover.jsx'
// import TaskCustonFields from '../cmps/task-custom-fields.jsx'

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
        const { currGroup, currTask } = boardService.getTaskAndGroup(board, taskId)
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
                {task.style.color && <div style={{ backgroundColor: task.style.color }} className='task-details-cover-color'></div>}
                {task.style.imgUrl &&
                    <div className='task-details-cover-img'>
                        <div className='cover-img-container'>
                            <img src={task.style.imgUrl} alt="" />
                        </div>
                    </div>
                }
                <div className='task-details-header flex'>
                    <div className='flex left-side'>
                        <CreditCardSharpIcon className='credit-card-icon' />
                        <div className='title flex column'>
                            <h1>{task.title}</h1>
                            <h2>
                                in list <span>{currGroupRef.current.title}</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className='icon-container close flex'>
                    <img src={close} alt='close' style={{ width: '21px' }} />
                </div>
                <div className='task-main-layout flex'>
                    <div className='task- flex column'>
                        <div className='flex'>
                            <MembersList />

                            <h4>Labels</h4>

                            {task.dueDate && <DatePreview task={task}/>}
                        </div>
                        <label>Description</label>
                    </div>
                    <TaskNavBar />
                </div>
            </div>
        </>
    )
}
