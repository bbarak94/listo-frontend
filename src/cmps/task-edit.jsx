import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateTask } from "../store/actions/board.action"
import { TaskEditPreviewNav } from "./task-preview-edit-nav"

import { Labels } from './task-preview/labels'
import { Dates } from './task-preview/dates'
import { Description } from './task-preview/description'
import { Attachments } from './task-preview/attachments'
import { Checklists } from './task-preview/checklists'
import { Comments } from './task-preview/comments'
import { Members } from './task-preview/members'

export const TaskEdit = ({ task, board, group, setTaskEditExpand, style, previewIconStyle, onOpenModal }) => {

    const [title, setTitle] = useState(task.title)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        dispatch(updateTask(task, board._id, group.id))
        setTaskEditExpand(null)
    }

    const goToTaskDetails = () => {
        navigate(`/board/${board._id}/task/${task.id}`)
        setTaskEditExpand(null)
    }

    if (!task) return
    const taskEditNavTop = style.top + 290 > window.innerHeight ? -188 : 1
    if (style.top + 145 > window.innerHeight) style.top = 675

    return (
        <section className="task-edit" style={style}>
            <div className="task-title-edit">
                <form onSubmit={onHandleSubmit} >
                    <Labels board={board} task={task} />
                    <textarea
                        style={{ width: style.width }}
                        dir="auto"
                        onKeyDown={onEnterPress}
                        onChange={onHandleChange}
                        onFocus={(ev) => ev.target.select()}
                        value={title}
                        spellCheck="false"
                        autoFocus
                    />
                    <div className='previews flex'>
                        <Dates board={board} group={group} task={task} />
                        <Description task={task} previewIconStyle={previewIconStyle}/>
                        <Attachments task={task} previewIconStyle={previewIconStyle}/>
                        <Checklists task={task} previewIconStyle={previewIconStyle}/>
                        <Comments task={task} previewIconStyle={previewIconStyle}/>
                        <Members board={board} task={task} previewIconStyle={previewIconStyle} onOpenModal={onOpenModal}/>
                    </div>
                </form>
                <button className="btn" onClick={onHandleSubmit}>Save</button>
            </div>

            <TaskEditPreviewNav
                goToTaskDetails={goToTaskDetails}
                task={task}
                board={board}
                group={group}
                taskEditNavTop={taskEditNavTop}
            />

        </section>
    )
}