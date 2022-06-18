import { useDispatch } from "react-redux"

import { boardService } from "../../services/board.service"
import { saveBoard, updateTask } from "../../store/actions/board.action"

import { TaskPreview } from "../task-preview/task-preview"

export const ArchiveItems = ({ onOpenModal, board, handleClose, setLabelExpand, 
    setTitleLabelClass, setLabelTitleDelay, titleLabelClass }) => {

    const dispatch = useDispatch()

    const onSendToBoard = (task) => {
        const group = boardService.getGroup(board, task.id)
        task.archivedAt = null
        dispatch(updateTask(task, board._id, group.id))
    }

    const onDeleteTask = async (task) => {
        const updatedBoard = boardService.removeTaskFromBoard(board, task.id)
        dispatch(saveBoard(updatedBoard))
    }

    return <>
        <div className='title-container flex justify-center'>
            <h1>Archive</h1>
            <div className="close-btn" onClick={handleClose}></div>
        </div>
        <hr></hr>
        <div className="menu-layout flex column">
            {boardService.getArchivedTasks(board).map(archivedTask => {
                return <div key={archivedTask.id} className="archived-item-container flex column">
                    <TaskPreview onOpenModal={onOpenModal} handleClose={handleClose} task={archivedTask} board={board} titleLabelClass={titleLabelClass}
                        setLabelExpand={setLabelExpand} setTitleLabelClass={setTitleLabelClass} setLabelTitleDelay={setLabelTitleDelay} />

                    <div className="span-container flex align-center">
                        <span onClick={() => onSendToBoard(archivedTask)} >Send to board</span>
                        <span>&nbsp; - &nbsp;</span>
                        <span onClick={() => onDeleteTask(archivedTask)}>Delete</span>
                    </div>
                </div>
            }
            )}
        </div>
    </>
}
