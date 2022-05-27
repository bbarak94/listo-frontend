import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveBoard, updateTask } from '../store/actions/board.action';
import undo from '../assets/img/task/navbar/undo.svg'
import archive from '../assets/img/task/navbar/archive.svg'
import { boardService } from '../services/board.service';
import { useNavigate } from 'react-router-dom';

export const ArchiveTask = ({ board, task }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [isArchived, setIsArchived] = useState(false)

    const onToggleTaskToArchive = () => {
        if (task.archivedAt){

            task.archivedAt = Date.now()
        }else{

            task.archivedAt =null
        }
        // setIsArchived(true)
        const group = boardService.getGroup(board, task.id)
        // console.log('onSendTaskToArchive ~ x', x)
        // dispatch(saveBoard(updatedBoard))
        // const { currGroup, currTask } = boardService.getTaskAndGroup(board, taskId)
        dispatch(updateTask(task, board._id, group.id))

    }
    
    const onSendToBoard = () => {
        // setIsArchived(false)
        // dispatch(saveBoard(updatedBoard))

    }

    const onDeleteTask = async () => {
        const updatedBoard = boardService.deleteTask(task.id, board)
        dispatch(saveBoard(updatedBoard))
        navigate(`/board/${board._id}`)
    }

    return (
        <>
            {!task.archiveAt && <div className='task-edit-btn flex align-center' onClick={onToggleTaskToArchive} >
                <div>
                    <img
                        src={archive}
                        alt='Custom Fields'
                        style={{ width: '18px' }}
                    />
                </div>
                <h2>Archive</h2>
            </div>}

            {task.archiveAt && <>
                <div className='task-edit-btn flex align-center' onClick={onToggleTaskToArchive} >
                    <div>
                        <img
                            src={undo}
                            alt='Custom Fields'
                            style={{ width: '18px' }}
                        />
                    </div>
                    <h2>Send to board</h2>
                </div>

                <div className='task-edit-btn-delete flex align-center' onClick={onDeleteTask} >
                    <h2>➖Delete</h2>
                </div>
            </>}
        </>
    )

}