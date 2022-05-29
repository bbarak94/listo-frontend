import { selectClasses } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../../services/board.service'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ListSubheader from '@mui/material/ListSubheader'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { utilService } from '../../services/util.service'
import { updateTask } from '../../store/actions/board.action'

export const Checklist = ({ board, group, task, handleClose }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('Checklist')
    const [fromChecklist, setFromChecklist] = useState('')

    function selectText(ev) {
        ev.target.focus()
        ev.target.select()
    }

    const handleChecklistChange = (event) => {
        setFromChecklist(event.target.value)
    }

    const handleTitleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const handleSubmit = (ev) => {
        console.log('title:', title)
        console.log('fromChecklist:', fromChecklist)
        const newTask = { ...task }

        newTask.checklists.push({
            id: utilService.makeId(),
            title,
            todos: [],
        })
        dispatch(updateTask(newTask, board._id, group.id))
        handleClose()
    }
    console.log('task:', task)
    console.log('task.checklists:', task.checklists)
    console.log('board:', board)

    return (
        <div className='checklist-popup'>
            <div className='title-container flex'>
                <h1>Add checklist</h1>
            </div>
            <hr></hr>
            <h2>Title</h2>
            <div className='input-container flex colum'>
                <form style={{ width: '96%' }} onSubmit={handleSubmit}>
                    <OutlinedInput
                        onChange={handleTitleChange}
                        onSubmit={handleSubmit}
                        onKeyDown={(ev) => {
                            if (ev.keyCode === 13) {
                                handleSubmit(ev)
                            }
                        }}
                        defaultValue='Checklist'
                        onFocus={(ev) => {
                            selectText(ev)
                        }}
                        autoFocus
                        className='checklist-input'
                        placeholder='Checklist'
                        variant='filled'
                    />

                    {task && (
                        <div className='exicting-tasks-container'>
                            <h2>Copy items from...</h2>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel htmlFor='grouped-select'>
                                    None
                                </InputLabel>
                                <Select
                                    defaultValue=''
                                    id='grouped-select'
                                    label='None'
                                    onChange={handleChecklistChange}
                                    onSubmit={handleSubmit}
                                >
                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    {/* {task.checklists.map((checklist, cIdx) => {
                                        <ListSubheader key={cIdx}>{checklist.title}</ListSubheader>
                                        {
                                            checklist.todos.map(
                                                (todo, tIdx) => {
                                                    <MenuItem key={tIdx} value={1}>
                                                        {todo.title}
                                                    </MenuItem>
                                                }
                                            )
                                        }
                                    })} */}
                                    <ListSubheader>task title</ListSubheader>
                                    <MenuItem value={1}>
                                        checklist name1
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        checklist name1
                                    </MenuItem>
                                    <ListSubheader>Category 1</ListSubheader>
                                    <MenuItem value={1}>Option 1</MenuItem>
                                    <MenuItem value={2}>Option 2</MenuItem>
                                    <ListSubheader>Category 2</ListSubheader>
                                    <MenuItem value={3}>Option 3</MenuItem>
                                    <MenuItem value={4}>Option 4</MenuItem>
                                </Select>
                            </FormControl>

                            {/* <h1>{task.checklists[0].title}</h1> */}
                        </div>
                    )}
                    <Button
                        variant='contained'
                        size='medium'
                        onClick={handleSubmit}
                    >
                        Add
                    </Button>
                </form>
            </div>
        </div>
    )
}
