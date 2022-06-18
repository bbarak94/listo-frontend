import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../store/actions/board.action'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Button from '@mui/material/Button'

import more from '../../assets/img/todo/more.svg'
import date from '../../assets/img/todo/date.svg'
import assign from '../../assets/img/todo/assign.svg'

import { LinearWithValueLabel } from '../helpers/linear-progress-with-label'
import { boardService } from '../../services/board.service'

export const TaskDetailsChecklist = ({ checklist, task, board, groupId }) => {
    const [title, setTitle] = useState('')
    const [isTxtOpen, setIsTxtOpen] = useState(false)
    const dispatch = useDispatch()

    const getDonePercentage = () => {
        var doneCount = 0
        checklist?.todos.forEach(todo => {
            if (todo.isDone) doneCount++
        })
        if (!doneCount) return 0
        return +100 / (checklist.todos?.length / doneCount)
    }

    const onDeleteChecklist = () => {
        const newTask = { ...task }
        newTask.checklists = newTask.checklists.filter(
            (c) => c.id !== checklist.id
        )
        dispatch(updateTask(newTask, board._id, groupId))
    }

    const onCloseTxt = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setIsTxtOpen(false)
    }

    const onAddTodo = () => {
        const todo = boardService.getEmptyTodo()
        todo.title = title
        checklist.todos.push(todo)
        dispatch(updateTask(task, board._id, groupId))
        setIsTxtOpen(false)
        setTitle('')
    }

    const onToggleTodo = (todoId) => {
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
        dispatch(updateTask(newTask, board._id, groupId))
    }

    const onRemoveTodo = (todoId) => {
        const newTask = { ...task }
        const taskId = task.id
        var cIdxx
        var tIdxx
        newTask.checklists.map((c, cIdx) => {
            if (c.id === checklist.id) {
                return c.todos.map((t, tIdx) => {
                    if (t.id === todoId) {
                        cIdxx = cIdx
                        tIdxx = tIdx
                        return
                    }
                })
            }
        })
        newTask.checklists[cIdxx].todos.splice(tIdxx, 1)
        dispatch(updateTask(newTask, board._id, groupId))
    }

    return (
        <div className='task-checklist flex column'>
            <div className='top-container flex space-between'>
                <div className='top-left-container flex'>
                    <div className="task-details-left-icon checklist-icon-container">
                        <CheckBoxOutlinedIcon style={{ width: '26px' }} />
                    </div>
                    <h2>{checklist.title}</h2>
                </div>

                <Button onClick={onDeleteChecklist}>Delete</Button>
            </div>
            <LinearWithValueLabel value={getDonePercentage()} />

            {checklist.todos.map((todo, idx) => {
                return (
                    <div key={idx} className='task-checklist-todo flex'>
                        <div className='todo-left-container flex'>
                            {todo.isDone && (
                                <div
                                    onClick={() => onToggleTodo(todo.id)}
                                    className='checkbox-done'
                                >
                                    <CheckRoundedIcon className='done-icon' />
                                </div>
                            )}
                            {!todo.isDone && (
                                <div
                                    onClick={() => {
                                        onToggleTodo(todo.id)
                                    }}

                                    className='checkbox'
                                ></div>
                            )}
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

                            <div onClick={() => onRemoveTodo(todo.id)}>
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
            {isTxtOpen && <div className="add-todo">
                <form>

                    <input
                        className='todo-title'
                        onChange={(ev) => setTitle(ev.target.value)}
                        value={title}
                        autoComplete='off'
                        spellCheck='false'
                        autoFocus
                        placeholder='Add an item'
                        onSubmit={onAddTodo}
                    />
                    <button className='btn add-todo-btn' onClick={onAddTodo}>Add</button>
                    <button className='btn cancel-todo-btn' onClick={onCloseTxt}>Cancel</button>
                </form>
            </div>}
            <Button onClick={() => setIsTxtOpen(true)} className='add-btn'>Add an item</Button>
        </div>
    )
}
