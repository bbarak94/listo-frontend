import { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { boardService } from '../services/board.service'
import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp';
export const TaskDetails = () => {
    const { boardId, taskId } = useParams()
    const [board, setBoard] = useState(null)
    const [task, setTask] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadBoard()
        console.log('board:', board)
    }, [])

    useEffectUpdate(() => {
        getTask()
    }, [board])

    const loadBoard = async () => {
        const currBoard = await boardService.getById(boardId)
        console.log('currBoard:', currBoard)
        setBoard(currBoard)
    }

    const getTask = () => {
        if (!board) return

        // var currGroups = []
        // board.groups.forEach((group) => {
        //     currGroups.push(group)
        // })

        // var currTasks = []
        // currGroups.forEach((group) => {
        //     group.tasks.forEach((task) => {
        //         currTasks.push(task)
        //     })
        //     currTasks.push(task)
        // })
        // var currTask = currTasks.find((task) => {
        //     return task.id === taskId
        // })
        // console.log('currTask:', currTask)
        // setTask(currTask)

        let currTask
        board.groups.forEach((g) => {
            if (currTask) return
            currTask = g.tasks.find((t) => t.id === taskId)
        })
        console.log('currTask:', currTask)
        setTask(currTask)

        // console.log('currTask:',currTask)
        // return currTask
    }

    if (!task) return <h1>Loading...</h1>
    return (
        <>
            <div
                className='screen'
                onClick={() => {
                    navigate(`/board/${boardId}`)
                }}
            ></div>
            <div className='task-details flex column'>
                <div className='title flex'>
                    <div className='flex align-center'>
                        <div className='icon-container'>
                        <CreditCardSharpIcon/>
                        </div>
                        <h2>Recently viewed</h2>
                    </div>
                </div>
                <h1>{task.title}</h1>
            </div>
        </>
    )
}
