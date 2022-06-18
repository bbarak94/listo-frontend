import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateTask } from "../../store/actions/board.action"
import { TaskEditPreviewNav } from "./task-preview-edit-nav"

import { Labels } from './preview-labels'
import { Dates } from './preview-dates'
import { Description } from './preview-description'
import { Attachments } from './preview-attachments'
import { Checklists } from './preview-checklists'
import { Comments } from './preview-comments'
import { Members } from './preview-members'

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
    if (style.task.top + 145 > window.innerHeight) style.task.top = 675

    return (
        <section className="task-edit" style={style.task}>
            <div className="task-title-edit">
                <form onSubmit={onHandleSubmit} >
                    <Labels board={board} task={task} />
                    <textarea
                        style={{ width: style.task.width }}
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
                style={style.nav}
            />
        </section>
    )
}