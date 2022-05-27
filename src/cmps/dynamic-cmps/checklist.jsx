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

export const Checklist = ({board, group, task}) => {
    const dispatch = useDispatch()
    // const [task, setTask] = useState(null)
    // const [group, setGroup] = useState(null)
    // const { boardId, taskId } = useParams()
    // const { board } = useSelector((storeState) => storeState.boardModule)

    // useEffect(() => {
    //     const { currTask, currGroup } = boardService.getTaskAndGroup(
    //         board,
    //         taskId
    //     )
    //     console.log('currTask:',currTask)
        
    //     setTask(currTask)
    //     setGroup(currGroup)
    // }, [board])

    function selectText(ev) {
        ev.target.focus()
        ev.target.select()
    }

    const onHandleSubmit = (ev) => {
        // const { currTask } = boardService.getTaskAndGroup(board, task.id)
        // console.log('submitted')
        // console.log('boardId:', board._id)
        // console.log('taskId:', task.id)
        // console.log('board:', board)
        // console.log('group:', group)
        // console.log('currTask:', task)
        // console.log('task:', task)
        ev.preventDefault()
    }

    return (
        <div className='checklist-popup'>
            <div className='title-container flex'>
                <h1>Add checklist</h1>
            </div>
            <hr></hr>
            <h2>Title</h2>
            <div className='input-container flex colum'>
                <form style={{ width: '96%' }} onSubmit={onHandleSubmit}>
                    <OutlinedInput
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
                            <FormControl
                                className='form'
                                sx={{ minWidth: '100%' }}
                            >
                                <InputLabel
                                    className='label'
                                    htmlFor='grouped-select'
                                >
                                    (None)
                                </InputLabel>
                                <Select
                                    className='checklist-select'
                                    defaultValue=''
                                    id='grouped-select'
                                    label='Grouping'
                                >
                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    {!task && <></>}

                                    {task.checklists.length && (
                                        <div>
                                            <ListSubheader>
                                                {task.title}
                                                {/* {'test'} */}
                                            </ListSubheader>
                                            {task.checklists.map(
                                                (checklist, idx) => {
                                                        return <MenuItem key={idx} value={1}>{checklist.title}</MenuItem>
                                                }
                                            )}
                                        </div>
                                    )}
                                    {/* <ListSubheader>Category 1</ListSubheader>
                                    <MenuItem value={1}>Option 1</MenuItem>
                                    <MenuItem value={2}>Option 2</MenuItem>
                                    <ListSubheader>Category 2</ListSubheader>
                                    <MenuItem value={3}>Option 3</MenuItem>
                                    <MenuItem value={4}>Option 4</MenuItem> */}
                                </Select>
                            </FormControl>

                            {/* <h1>{task.checklists[0].title}</h1> */}
                        </div>
                    )}
                    <Button
                        variant='contained'
                        size='medium'
                        onClick={onHandleSubmit}
                    >
                        Add
                    </Button>
                </form>
            </div>
        </div>
    )
}
