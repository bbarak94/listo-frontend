import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../store/actions/board.action"

export const AddTask = ({ setExpandShownId, expandShownGroupId, groupId, boardId }) => {

    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const onHandleChange = (ev) => {
        console.log(ev.keyCode);
        setTitle(ev.target.value)
    }

    const onHandleSubmit = (ev) => {
        console.log('ev', ev)
        ev.preventDefault()
        dispatch(addTask(title, boardId, groupId))
    }

    const onEnterPress = (ev) => {
        if (ev.keyCode == 13 && ev.shiftKey == false) {
            ev.preventDefault();
            onAddTask()
        }
    }

    const onAddTask = () => {
        if (title === '') return
        dispatch(addTask(title, boardId, groupId))
    }

    return (
        <div className="task-composer">
            {expandShownGroupId !== groupId && <div className="add-card flex align-center" onClick={() => setExpandShownId(groupId)}>
                <span className="add-icon"></span>
                <span className="add-card-txt">Add a card</span>
            </div>}
            {expandShownGroupId === groupId &&
                <form onSubmit={onHandleSubmit}>
                    <textarea onKeyDown={onEnterPress} autoFocus onChange={onHandleChange} value={title} placeholder="Enter a title for this card..." />
                    <div className='add-group-actions flex'>
                        <button className="btn">Add card</button>
                        <span className="close-btn" onClick={() => setExpandShownId('')}></span>
                    </div>
                </form>
            }
        </div>
    )
}