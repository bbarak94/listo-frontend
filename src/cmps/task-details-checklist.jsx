import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../store/actions/board.action'
import { LinearProgress } from '@mui/material'
import more from '../assets/img/todo/more.svg'
import date from '../assets/img/todo/date.svg'
import assign from '../assets/img/todo/assign.svg'
import done from '../assets/img/todo/done.svg'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import Button from '@mui/material/Button'

import { LinearWithValueLabel } from './helpers/linear-progress-with-label'

export const TaskDetailsChecklist = ({ checklist, task, boardId, groupId }) => {
    const [todo, setTodo] = useState(task.desc)
    const [isTxtOpen, setTxtOpen] = useState(false)

    const dispatch = useDispatch()
    const onDeleteChecklist = () => {
        const newTask = { ...task }
        newTask.checklists = newTask.checklists.filter(
            (c) => c.id !== checklist.id
        )
        dispatch(updateTask(newTask, boardId, groupId))
    }

    const onToggleTodo = (todoId) => {
        console.log('todoId:', todoId)
        const newTask = { ...task }
        const taskId = task.id
        newTask.checklists.map((c) => {
            if (c.id === checklist.id) {
                return c.todos.map((t) => {
                    if (t.id === todoId) {
                        t.isDone = !t.isDone
                    }
                })
            }
        })
        dispatch(updateTask(newTask, boardId, groupId))
    }

    return (
        <div className='task-checklist flex column'>
            <div className='top-container flex space-between'>
                <div className='top-left-container flex'>
                    <div>
                        <CheckBoxOutlinedIcon style={{ width: '26px' }} />
                    </div>
                    <h2>{checklist.title}</h2>
                </div>

                <Button onClick={onDeleteChecklist}>Delete</Button>
            </div>
            <LinearWithValueLabel />

            {checklist.todos.map((todo, idx) => {
                return (
                    <div key={idx} className='task-checklist-todo flex'>
                        <div className='todo-left-container flex'>
                            {todo.isDone && (
                                <div
                                    onClick={() => onToggleTodo(todo.id)}
                                    className='checkbox-done'
                                >
                                    <img
                                        src={done}
                                        alt='Done'
                                        style={{ width: '16px' }}
                                    />
                                </div>
                            )}
                            {!todo.isDone && (
                                <div
                                    onClick={() => onToggleTodo(todo.id)}
                                    className='checkbox'
                                ></div>
                            )}

                            {/* <div className='unchecked'></div> */}

                            {!todo.isDone && (
                                <div className='todo-title'>{todo.title}</div>
                            )}

                            {todo.isDone && (
                                <div className='todo-title todo-title-done'>
                                    {todo.title}
                                </div>
                            )}
                        </div>
                        <div className='todo-btns flex'>
                            <div>
                                <img
                                    src={date}
                                    alt='Date'
                                    style={{ width: '20px' }}
                                />
                            </div>
                            <div>
                                <img
                                    src={assign}
                                    alt='Assign'
                                    style={{ width: '20px' }}
                                />
                            </div>
                            <div>
                                <img
                                    src={more}
                                    alt='More'
                                    style={{ width: '20px' }}
                                />
                            </div>
                        </div>
                    </div>
                )
            })}

            <Button className='add-btn'>Add an item</Button>
        </div>
    )
}
