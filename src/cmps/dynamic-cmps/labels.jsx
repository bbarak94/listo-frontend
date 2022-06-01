
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppModal } from '../app-modal'

import { labelService } from '../../services/label.service'
import { updateTask } from '../../store/actions/board.action'

export const Labels = ({ board, group, task }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState({})

    const onToggleLabel = async (labelId) => {
        const updatedTask = await labelService.toggleLabel(labelId, task)
        dispatch(updateTask(updatedTask, board._id, group.id))
    }

    const isLabelOnTask = (labelId) => {
        if (!task) return
        if (!task.labelIds) task.labelIds = []
        return task.labelIds.includes(labelId)
    }

    const onHandleClick = (ev) => {
        setIsOpen(true)

        let elemRect = ev.currentTarget.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.currentTarget.offsetHeight
        top += height
        setPosition({top, left})
    }

    return (
        <>
            {<div className="label">
                <h1>Labels</h1>
                <hr />
                <ul className='label-list'>
                    {board.labels.map(label => {
                        return (
                            <li className='label-list-item' key={label.id} style={{ background: label.color }}
                                onClick={() => onToggleLabel(label.id)} >
                                <span>{label.title}</span>
                                {isLabelOnTask(label.id) && <span>✔</span>}
                            </li>
                        )
                    })}
                </ul>
                <button onClick={(ev) => { onHandleClick(ev) }} > Create a new label</button>
            </div>}
            <AppModal position={position} board={board} cmpType={'edit-label'} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}