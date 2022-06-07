import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { boardService } from '../../services/board.service'
import { userService } from '../../services/user.service'
import { updateTask } from '../../store/actions/board.action'


export const Member = ({ member, renderFrom, onLogout, handleClose }) => {
    const user = userService.getLoggedinUser()
   
    const { board } = useSelector((storeState) => storeState.boardModule)
    const { boardId, taskId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onRemoveMember = () => {
        const { currGroup, currTask } = boardService.getTaskAndGroup(
            board,
            taskId
        )
        const newTask = { ...currTask }
        newTask.memberIds = newTask.memberIds.filter((m) => m !== member.id)
        dispatch(updateTask(newTask, boardId, currGroup.id))
        navigate(`/board/${boardId}/task/${taskId}`)
        handleClose()
    }

    return (
        <div className='member-popup flex column'>
            <div className='main-container flex'>
                <div className='member-container flex'>
                    <img src={member.imgUrl} />
                </div>
                <div className='member-title flex column'>
                    <h1>{member.fullname}</h1>
                    <h3>@{member.username}</h3>
                </div>
            </div>
            <div className='btn'>
                <h2>Edit profile info</h2>
            </div>
            <hr></hr>
            {taskId &&
                <div className='btn' onClick={onRemoveMember}>
                    <h2>Remove from card</h2>
                </div>
            }

            {(user.username !== 'guest') && (renderFrom === 'header') &&
                <div className='btn' onClick={onLogout}>
                    <h2>Logout</h2>
                </div>
            }
        </div>
    )
}
