import { boardService } from '../../services/board.service'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const MembersList = () => {
    const { taskId } = useParams()
    const { board } = useSelector((storeState) => storeState.boardModule)
    const { currTask } = boardService.getTaskAndGroup(board, taskId)
    const [currMembers, setCurrMembers] = useState(currTask.memberIds || [])
    console.log('currMembers:', currMembers)

    useEffect(() => {
<<<<<<< HEAD
        // const { currTask } = boardService.getTaskAndGroup(board, taskId)
        // const newCurrMembers = []
        // currTask.memberIds.forEach((id) => {
        // })
        // const { currTask } = boardService.getTaskAndGroup(board, taskId)
        // board.members.forEach((m) => {
        //     if (!currTask.memberIds) currTask.memberIds = []
        //     if (currTask.memberIds.includes(m.id)) {
        //         setCurrMembers([m.id, ...currMembers])
        //     }
        // })
        // console.log('currMembers:', currMembers)
=======
        const { currTask } = boardService.getTaskAndGroup(board, taskId)
        // console.log('board:', board)
        // console.log('taskId:', taskId)
        // console.log('currTask:', currTask)
        board.members.forEach((m) => {
            console.log('m:', m)
            console.log('currTask.memberIds:', currTask.memberIds)
            console.log('m.id:', m.id)
            if (!currTask.memberIds) currTask.memberIds = []
            if (currTask.memberIds.includes(m.id)) {
                // console.log('m:', m)
                // console.log('m.id:', m.id)
                setCurrMembers([m, ...currMembers])
            }
        })
        console.log('currMembers:', currMembers)
>>>>>>> 90f8e137ff9280a6289c372949a5b9344aa0f57b
    }, [])

    return (
        <div className='members-list-container flex'>
            <h1>Members</h1>
            {currMembers.map((m, idx) => {
                return <h1 key={idx}>{m.username}</h1>
            })}
            <div className='members-avatars-container'></div>
        </div>
    )
}
