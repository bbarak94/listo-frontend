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
