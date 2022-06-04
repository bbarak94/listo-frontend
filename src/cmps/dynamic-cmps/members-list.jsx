import { useState, useEffect } from 'react'

import add from '../../assets/img/members/add.svg'

export const MembersList = ({ board, task, onOpenModal }) => {
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
                        <div key={idx} className='member-container flex' onClick={(ev) => onOpenModal(ev, 'member', member)}>
                            <img src={member.imgUrl} />
                        </div>
                    )
                })}
                <div onClick={(ev) => onOpenModal(ev, 'members')}>
                    <div className='plus-container flex'>
                        <img src={add} />
                    </div>
                </div>
            </div>
        </div>
    )
}
