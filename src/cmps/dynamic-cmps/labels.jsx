
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useEffectUpdate } from '../../hooks/useEffectUpdate'

import { AppModal } from '../app-modal'

import { labelService } from '../../services/label.service'
import { boardService } from '../../services/board.service'
import { updateTask } from '../../store/actions/board.action'
export const Labels = ({ board, group, task }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)

    const onToggleLabel = async (labelId) => {
        const updatedTask = await labelService.toggleLabel(labelId, task)
        dispatch(updateTask(updatedTask, board._id, group.id))
    }

    const isLabelOnTask = (labelId) => {
        if (!task) return
        if (!task.labelIds) task.labelIds = []
        return task.labelIds.includes(labelId)
    }

    const colors = [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D'
    ]

    return (
        <>
            {<div className="label">
                <h1>Labels</h1>
                <hr />
                <ul className='label-list'>
                    {board.labels.map(label => {
                        return (
                            <li className='label-list-item' key={label.id} style={{ background: label.color }} onClick={() => onToggleLabel(label.id)} >
                                <span>{label.title}</span>
                                {isLabelOnTask(label.id) && <span>✔</span>}
                            </li>
                        )
                    })}
                </ul>
                <button onClick={()=>setIsOpen(true)} > Create a new label</button>
            </div>}

            <AppModal  board={board} cmpType={'edit-label'} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}