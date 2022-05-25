import { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { boardService } from '../services/board.service'

export const TaskDetails = () => {

    const { boardId, groupId, taskId } = useParams()



    const loadBoard = async () => {
        const board = await boardService.getById(boardId)
        setBoard(board)
    }
    const [board, setBoard] = useState(null)


    const getTask = () => {
        board?.groups.find(g => g.id === groupId).tasks.find(t => t.id === taskId)
    }
    const [task, setTask] = useState(getTask())


    useEffect(() => {
        loadBoard()
    }, [])


    if (!task) return <h1>Loading...</h1>
    return (
        <div className="task-details">
            <div className="task-details-header">
                <input type="text" />
                <p>hiiiii</p>
            </div>
            <h1>{task.title}</h1>
        </div>
    )
}
