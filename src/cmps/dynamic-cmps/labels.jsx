
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useEffectUpdate } from '../../hooks/useEffectUpdate'

import { labelService } from '../../services/label.service'
import { boardService } from '../../services/board.service'
import { updateTask } from '../../store/actions/board.action'
export const Labels = () => {

    const { boardId, taskId } = useParams()
    const dispatch = useDispatch()

    const { board } = useSelector((storeState) => storeState.boardModule)
    const [task, setTask] = useState(null)

    const currGroupRef = useRef(null)
    // const basicLabelRef = useRef(labelService.getBaseLabels())


    useEffectUpdate(() => {
        const { currGroup, currTask } = boardService.getTaskAndGroup(board, taskId)
        setTask(currTask)
        currGroupRef.current = currGroup
    }, [board])



    const onToggleLabel = async (labelId) => {
        const updatedTask = labelService.toggleLabel(labelId, task)
        dispatch(updateTask(updatedTask, boardId, currGroupRef.current.id))
    }

    // const isLabelOnTask = (labelId) => {
    //            return task.labelIds.includes(labelId)
    // }

    // if (!task || !task.labelIds) return <h1>Loading...</h1>
    return (
        <>
            <p>labels</p>
            <hr />

            <ul>

                {board.labels.map(label => {
                    return (
                        <li key={label.id} style={{ background: label.color }} onClick={() => onToggleLabel(label.id)} >
                            <span>{label.title}</span>
                            {/* {isLabelOnTask(label.id) && <span>✔</span>} */}
                        </li>
                    )
                })}
                {/* {basicLabelRef.current.map((label, idx) => {
                    return (
                        <li key={idx} style={{ background: label.color }} onClick={() => onAddLabelToTask(label)}>
                            <span>{label.title}</span>
                        </li>
                    )
                })} */}
            </ul>
            <button> create new label</button>
        </>
    )
}