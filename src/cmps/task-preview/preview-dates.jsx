import { useDispatch } from 'react-redux'
import { useState } from 'react'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

import moment from 'moment'

import { updateTask } from '../../store/actions/board.action'

const dateIconStyle = {
    fontSize: '18px',
    paddingTop: '2px'
}

export const Dates = ({ board, group, task}) => {

    const dispatch = useDispatch()

    const [isMouseOver, setIsMouseOver] = useState(false)

    const onCompleteTask = (ev) => {
        ev.preventDefault()
        const taskToUpdate = { ...task }
        taskToUpdate.isComplete = !taskToUpdate.isComplete
        dispatch(updateTask(taskToUpdate, board._id, group.id))
    }

    let dateClass
    if (task.isComplete) dateClass = 'complete'
    else if (!task.isComplete && task.dueDate < Date.now()) dateClass = 'pastDue'
    else dateClass = ''

    const dateTitle = () => {
        if (task.isComplete) return 'This card is complete'
        else if(task.dueDate < Date.now()) return 'This card is past due'
        else return 'This card is due later'
    }

    return (
        <>
            {task.dueDate && (
                <div className={`task-preview-date flex ${dateClass}`}
                    onMouseOver={() => setIsMouseOver(true)}
                    onMouseOut={() => setIsMouseOver(false)}
                    onClick={onCompleteTask}
                    title={dateTitle()}
                >
                    {!isMouseOver && <AccessTimeIcon style={dateIconStyle} />}
                    {isMouseOver && task.isComplete && <CheckBoxOutlinedIcon style={dateIconStyle} />}
                    {isMouseOver && !task.isComplete && <CheckBoxOutlineBlankIcon style={dateIconStyle} />}

                    <span>
                        {moment(task.dueDate).format('MMMM D')}
                    </span>
                </div>
            )}
        </>

    )
}