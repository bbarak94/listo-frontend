import { useDispatch } from 'react-redux'

import OutlinedInput from '@mui/material/OutlinedInput'
import CheckIcon from '@mui/icons-material/Check'

import { updateTask } from '../../store/actions/board.action'

export const Members = ({ task, board, group }) => {
// console.log('board:',board)

    const dispatch = useDispatch()

    const isMemberInTask = (userId) => {
        return task.memberIds.includes(userId)
    }

    const onToggleMember = (member) => {
        const isMember = isMemberInTask(member.id)
        const newTask = { ...task }
        if (isMember) {
            newTask.memberIds = newTask.memberIds.filter(m => m !== member.id)
        } else {
            newTask.memberIds.unshift(member.id)
        }
        dispatch(updateTask(newTask, board._id, group.id))
    }
    return (
        <div className='members-popup'>
            <div className='title-container flex'>
                <h1>Members</h1>
            </div>
            <hr></hr>
            <div className='input-container flex column'>
                <OutlinedInput
                    autoFocus
                    className='members-input'
                    placeholder='Search members'
                    variant='filled'
                />
            </div>
            <h2>Board members</h2>
            <div className='members-container flex column'>
                {board.members.map((member, idx) => {
                    return (
                        <div key={idx} className='member-container flex' onClick={() => onToggleMember(member)}>
                            <img src={member.imgUrl} />
                            <h2>
                                {member.fullname}({member.username})
                            </h2>
                            {isMemberInTask(member.id) && (
                                <CheckIcon className='check-icon' />
                            )}
                            {!isMemberInTask(member.id) && <div></div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
