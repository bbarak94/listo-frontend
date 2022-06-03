import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'



import { boardService } from "../services/board.service"
import { saveBoard, updateTask } from "../store/actions/board.action"
import { ArchiveTaskPreview } from "./archive-task-preview"
import { TaskPreview } from "./task-preview"

export const ArchiveItems = ({ onOpenModal, board, handleClose, setLabelExpand, setTaskEditExpand }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onSendToBoard = (task) => {
        const group = boardService.getGroup(board, task.id)
        task.archivedAt = null
        dispatch(updateTask(task, board._id, group.id))
    }

    const onDeleteTask = async (task) => {
        console.log('onDeleteTask ~ task', task)
        const updatedBoard = boardService.removeTaskFromBoard(board, task.id)
        dispatch(saveBoard(updatedBoard))
    }

    return <>
        <div className='title-container flex justify-center'>
            <h1>Archive</h1>
        </div>
        <hr></hr>
        <div className="menu-layout flex column">

            {boardService.getArchivedTasks(board).map(archivedTask => {
                return <div key={archivedTask.id} className="archived-item-container flex column">
                    {/* <Link to={`/board/${board._id}/task/${archivedTask.id}`}> */}

                    {/* <ArchiveTaskPreview onOpenModal={onOpenModal} handleClose={handleClose} task={archivedTask} board={board} setLabelExpand={setLabelExpand} setTaskEditExpand={setTaskEditExpand} /> */}


                    {/* <div className="archived-item-details" onClick={handleClose} >
                            <span>{archivedTask.title}</span>

                        </div> */}
                    {/* </Link> */}

                    <TaskPreview onOpenModal={onOpenModal} handleClose={handleClose} task={archivedTask} board={board} setLabelExpand={setLabelExpand} setTaskEditExpand={setTaskEditExpand} />

                    <div className="flex align-center space-between">
                        <span onClick={() => onSendToBoard(archivedTask)} >Send to board</span>
                        <span onClick={() => onDeleteTask(archivedTask)}>Delete</span>
                    </div>
                </div>
            }
            )}

        </div>
    </>
}
