import { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useEffectUpdate } from '../hooks/useEffectUpdate'

import { boardService } from '../services/board.service'
import { Screen } from '../cmps/screen'
import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp'

import close from '../assets/img/workspace/close.svg'

import { TaskNavBar } from '../cmps/task-nav-bar.jsx'
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
    const [board, setBoard] = useState(null)
    const [task, setTask] = useState(null)
    // const navigate = useNavigate()


    useEffect(() => {
        loadBoard()
        console.log('board:', board)
    }, [])

    useEffectUpdate(() => {
        getTask()
    }, [board])

    const loadBoard = async () => {
        const currBoard = await boardService.getById(boardId)
        setBoard(currBoard)
    }

    const getGroup = () => {
        if (!board) return
        let currTask
        let currGroup
        board.groups.forEach((g) => {
            if (currTask) return
            currTask = g.tasks.forEach((t) => {
                if (t.id === taskId) {
                    currGroup = g
                }
            })
        })
        return currGroup
    }

    const getTask = () => {
        if (!board) return
        let currTask
        board.groups.forEach((g) => {
            if (currTask) return
            currTask = g.tasks.find((t) => t.id === taskId)
        })
        setTask(currTask)
    }

    if (!task) return <h1>Loading...</h1>
    const currGroup = getGroup()
    console.log('currGroup:', currGroup)

    return (
        <>
            <Screen boardId={boardId} />
            <div className='task-details flex column'>
                <div className='task-details-header flex'>
                    <div className='flex left-side'>
                        <CreditCardSharpIcon className='credit-card-icon' />
                        <div className='title flex align-center column'>
                            <h1>{task.title}</h1>
                            <h2>
                                in list <span>{currGroup.title}</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className='icon-container close flex'>
                    <img src={close} alt='close' style={{ width: '21px' }} />
                </div>
                <div className='task-main-layout flex'>
                    <div className='task- flex column'>
                        <label>Labels</label>
                        <label>Description</label>
                    </div>
                    <TaskNavBar />
                </div>
            </div>
        </>
    )
}
