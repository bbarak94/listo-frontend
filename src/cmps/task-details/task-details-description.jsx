import { useState } from "react"
import { useDispatch } from "react-redux"

import { updateTask } from "../../store/actions/board.action"

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';;


export const TaskDetailsDescription = ({ task, boardId, groupId }) => {
    
    const [description, setDescription] = useState(task.description)
    const [isTxtAreaOpen, setTxtAreaOpen] = useState(false)
    const dispatch = useDispatch()
    
    const onHandleChange = ({ target }) => {
        setDescription(target.value)
    }
    
    const onHandleSubmit = () => {
        const taskToUpdate = { ...task }
        taskToUpdate.description = description
        dispatch(updateTask(taskToUpdate, boardId, groupId))
        setTxtAreaOpen(false)
    }

    const textAreaClass = isTxtAreaOpen ? 'open' : ''

    return (
        <div className='task-desc flex column'>
            <div className="desc-header flex">
                <div className="task-details-left-icon desc-icon-container">
                    <ArticleOutlinedIcon className="desc-icon" style={{color: '#5e6c84'}}/>
                </div>
                <h3>Description</h3>
            </div>
            <textarea
                id="desc"
                className={textAreaClass}
                placeholder='Add a more detailed description...'
                onFocus={(ev) => ev.target.select()}
                onBlur={onHandleSubmit}
                onClick={() => setTxtAreaOpen(true)}
                onChange={onHandleChange}
                spellCheck="false"
                value={description}
            />
            {isTxtAreaOpen &&
            <div className="flex">
                <button className="btn" onClick={onHandleSubmit}>Save</button>
                <button className="btn btn-cancel" onClick={() => setTxtAreaOpen(false)}>Cancel</button>
            </div>}
        </div>
    )
}