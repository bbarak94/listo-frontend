import OutlinedInput from '@mui/material/OutlinedInput'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { boardService } from '../../services/board.service'
import CheckIcon from '@mui/icons-material/Check'
import {updateTask} from '../../store/actions/board.action'
export const Members = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()
    const { boardId, taskId } = useParams()

    const isMemberInTask = (userId) => {
        const { currTask } = boardService.getTaskAndGroup(
            board,
            taskId
        )
        return currTask.memberIds.includes(userId)
    }

    const onToggleMember = (member) => {
        const isMember = isMemberInTask(member.id)
        const { currGroup, currTask } = boardService.getTaskAndGroup(
            board,
            taskId
        )
        const newTask = {...currTask}
        if(isMember){
            newTask.memberIds = newTask.memberIds.filter(m => m!==member.id)
        }else{
            newTask.memberIds.unshift(member.id)
        }
        
        dispatch(updateTask(newTask, boardId, currGroup.id ))
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
                {board.members.map((member,idx) => {
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
