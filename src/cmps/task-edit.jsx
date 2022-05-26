import { useState } from "react"
import { useDispatch } from "react-redux"

import { updateTask } from "../store/actions/board.action"
import { TaskEditPreviewNav } from "./task-preview-edit-nav"

export const TaskEdit = ({ task, boardId, groupId, setTaskEditExpand }) => {

    const [title, setTitle] = useState(task.title)
    const dispatch = useDispatch()

    const onHandleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onHandleSubmit = (ev) => {
        ev.stopPropagation()
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
        task = { ...task, title: title }
        dispatch(updateTask(task, boardId, groupId))
        setTaskEditExpand(false)
    }

    return (
        <section className="task-edit">
            <div className="task-title-edit">
                < form onSubmit={onHandleSubmit}>
                    <textarea
                        onKeyDown={onEnterPress}
                        onChange={onHandleChange}
                        onFocus={(ev) => ev.target.select()}
                        value={title}
                        spellCheck="false"
                        autoFocus
                    />
                    <button className="btn">Save</button>
                </form>
            </div>
            <TaskEditPreviewNav />
        </section>
    )
}