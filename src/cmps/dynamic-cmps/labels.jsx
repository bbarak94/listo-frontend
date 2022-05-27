
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

    // useEffect(()=>{
    //     const { currGroup, currTask } = boardService.getTaskAndGroup(board, taskId)
    //     currGroupRef.current = currGroup
    // },[])

    useEffectUpdate(() => {
        const { currGroup, currTask } = boardService.getTaskAndGroup(board, taskId)
        currGroupRef.current = currGroup
        setTask(currTask)
    }, [board])



    const onToggleLabel = async (labelId) => {
        const updatedTask = await labelService.toggleLabel(labelId, task)
        dispatch(updateTask(updatedTask, boardId, currGroupRef.current.id))
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
                <button> create new label</button>
            </div>}


            {/* {<div className="label-edit">
                <p>Create label</p>
                <hr />
                <input type="text" />
                <div className='cover-colors'>
                    {colors.map((color, idx) =>
                        <button key={idx} style={{ backgroundColor: color }}></button>
                    )}
                </div>
                <button> create new label</button>
            </div>} */}
        </>
    )
}