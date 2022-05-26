import { useState } from "react"
import { useDispatch } from "react-redux"

import { updateTask } from "../store/actions/board.action"

export const TaskEdit = ({ task }) => {

    const [title, setTitle] = useState(task.title)
    const dispatch = useDispatch()

    const onHandleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault()
        onUpdateTitle()
    }

    const onEnterPress = (ev) => {
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            ev.preventDefault();
            onUpdateTitle()
        }
    }

    const onUpdateTitle = () => {
        dispatch(updateTask(title, task.id))
    }

    return (
        <div className="task-edit">
            < form onSubmit={onHandleSubmit}>
                <textarea
                    onKeyDown={onEnterPress}
                    autoFocus 
                    onFocus={(ev) => ev.target.select()}
                    onChange={onHandleChange}
                    value={title}
                    spellCheck="false"
                />
                <button className="btn">Save</button>
            </form>
        </div>
    )
}