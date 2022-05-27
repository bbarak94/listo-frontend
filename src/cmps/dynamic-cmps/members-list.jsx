import { boardService } from '../../services/board.service'
import { useState,useEffect } from 'react'
import { DynamicPopup } from './dynamic-cmp'

export const MembersList = ({ board, task }) => {
    const [currMembers, setCurrMembers] = useState([])

    useEffect(() => {
        let newMembers = []
        board.members.forEach((member) => {
            if (isMemberInTask(member.id)) {
                newMembers.push(member)
            }
        })
        setCurrMembers(newMembers)
    }, [task])

    const isMemberInTask = (memberId) => {
        return task.memberIds.includes(memberId)
    }

    if (currMembers.length === 0) return <></>
    return (
        <div className='members-list-container flex column'>
            <h1>Members</h1>
            <div className='members-avatars-container flex'>
                {currMembers.map((member, idx) => {
                    return (
                        <div key={idx} className='member-container flex'>
                            <DynamicPopup member={member} name={'member'} />
                        </div>
                    )
                })}
                <DynamicPopup name={'plus-members'} />
            </div>
        </div>
    )
}
