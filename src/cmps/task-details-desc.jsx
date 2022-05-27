import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateTask } from "../store/actions/board.action"

export const TaskDetailsDesc = ({ task, boardId, groupId }) => {

    const [desc, setDesc] = useState(task.desc)
    const [isTxtAreaOpen, setTxtAreaOpen] = useState(false)
    const dispatch = useDispatch()

    const onHandleChange = ({target}) => {
        console.log(target.value);
        setDesc(target.value)
        
    }

    const onHandleSubmit = () => {
        if (desc === '') return
        const taskToUpdate = { ...task }
        taskToUpdate.desc = desc
        dispatch(updateTask(taskToUpdate, boardId, groupId))
        setTxtAreaOpen(false)
    }
    return (
        <div className='task-desc'>
            <h3>Description</h3>
            {task.desc !== '' && <label htmlFor="desc" onMouseOver={(ev)=> ev.preventDefault()} onClick={() => setTxtAreaOpen(true)}>Edit</label>}
            <textarea
                id="desc"
                style={{ height: isTxtAreaOpen ? '108px' : '', transition: 'height 1s'}}
                placeholder='Add a more detailed description...'
                onFocus={(ev) => ev.target.select()}
                onBlur={onHandleSubmit}
                onClick={() => setTxtAreaOpen(true)}
                onChange={onHandleChange}
                spellCheck="false"
                value={desc}
            />
            <button className="btn" onClick={onHandleSubmit}>Save</button>
            <button className="btn btn-cancel" onClick={() => setTxtAreaOpen(false)}>Cancel</button>
        </div>
    )
}