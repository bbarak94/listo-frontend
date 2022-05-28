import { useDispatch } from 'react-redux'
import { updateTask } from '../store/actions/board.action'
import { LinearProgress } from '@mui/material'
import { useState } from 'react'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import Button from '@mui/material/Button'

import { LinearWithValueLabel } from './helpers/linear-progress-with-label'

export const TaskDetailsChecklist = ({ checklist, task, boardId, groupId }) => {
    const [todo, setTodo] = useState(task.desc)
    const [isTxtOpen, setTxtOpen] = useState(false)

    return (
        <div className='task-checklist flex column'>
            <div className='top-container flex space-between'>
                <div className='top-left-container flex'>
                    <div>
                        <CheckBoxOutlinedIcon style={{ width: '26px' }} />
                    </div>
                    <h2>{checklist.title}</h2>
                </div>
                <Button>Delete</Button>
            </div>
            <LinearWithValueLabel />
            <Button className='add-btn'>Add an item</Button>
        </div>
    )
}
