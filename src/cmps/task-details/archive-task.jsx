import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { boardService } from '../../services/board.service';
import { saveBoard, updateTask } from '../../store/actions/board.action';

import undo from '../../assets/img/task/navbar/undo.svg'
import archive from '../../assets/img/task/navbar/archive.svg'

export const ArchiveTask = ({ board, group, task }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onToggleTaskToArchive = () => {
        if (task.archivedAt) {
            task.archivedAt = null
        } else {
            task.archivedAt = Date.now()
        }
        dispatch(updateTask(task, board._id, group.id))
    }

    const onDeleteTask = async () => {
        const updatedBoard = boardService.removeTaskFromBoard(board, task.id)
        dispatch(saveBoard(updatedBoard))
        navigate(`/board/${board._id}`)
    }

    return (
        <>
            {!task.archivedAt && <div className='task-edit-btn flex align-center' onClick={onToggleTaskToArchive} >
                <div>
                    <img
                        src={archive}
                        alt='Custom Fields'
                        style={{ width: '18px' }}
                    />
                </div>
                <h2>Archive</h2>
            </div>}

            {task.archivedAt && <>
                <div className='task-edit-btn flex align-center' onClick={onToggleTaskToArchive} >
                    <div className='undo-container'>
                        <img src={undo} alt='undo' />
                    </div>
                    <h2>Send to board</h2>
                </div>

                <div className='delete-task-btn flex align-center' onClick={onDeleteTask} >
                    <h2>Delete</h2>
                </div>
            </>}
        </>
    )
}