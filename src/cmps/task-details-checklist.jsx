// import { useState } from "react";
// import { useDispatch } from "react-redux";

// import { updateTask } from "../store/actions/board.action";

// export const TaskDetailsChecklist = ({ checklist, task, boardId, groupId }) => {



//     return (
//         <section className="task-checklist">
//             <div className="title-container flex space-between">
//                 <h3>{checklist.title}</h3>
//                 <button>Delete</button>
//             </div>

//             {checklist.todos.map((todo, idx) =>
//                 <Todo key={idx} todo={todo} checklist={checklist} task={task} boardId={boardId} groupId={groupId} />
//             )}

//         </section>
//     )
// }

// function Todo({ todo, task, checklist, boardId, groupId }) {

//     const [title, setTitle] = useState(todo.title)
//     const dispatch = useDispatch()

//     const onHandleChecked = ({ target }) => {
//         checklist = { ...checklist }
//         let todo = checklist.todos.find(todo => todo.title === target.name)
//         const idx = checklist.todos.findIndex(todo => todo.title === target.name)
//         todo = { ...todo }
//         todo.isDone = target.checked
//         checklist.todos.splice(idx, 1, todo)
//         dispatch(updateTask(task, boardId, groupId))
//     }

//     return (
//         <div className="todo-preview">
//             <input type="checkbox" checked={todo.isDone} name={todo.title} id="" onChange={onHandleChecked} />
//             <input
//                 type="text"
//                 style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
//                 value={title}
//                 onChange={(ev) => setTitle(ev.target.value)} />
//         </div>
//     )
// }





































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
import { boardService } from '../services/board.service'

export const TaskDetailsChecklist = ({ checklist, task, boardId, groupId }) => {
    const [title, setTitle] = useState('')
    const [isTxtOpen, setTxtOpen] = useState(false)

    const dispatch = useDispatch()
    const onDeleteChecklist = () => {
        const newTask = { ...task }
        newTask.checklists = newTask.checklists.filter(
            (c) => c.id !== checklist.id
        )
        dispatch(updateTask(newTask, boardId, groupId))
    }

    const onAddTodo = () => {
        const todo = boardService.getEmptyTodo()
        // checklist = {...checklist}
        checklist.todos.push(todo)
        dispatch(updateTask(task, boardId, groupId))
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
            {/* <LinearWithValueLabel /> */}

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
            {isTxtOpen && <div className="add-todo">
                <input
                    id='board-title'
                    onChange={(ev) => setTitle(ev.target.value)}
                    value={title}
                    autoComplete='off'
                    spellCheck='false'
                    autoFocus
                />
                <button className='btn' onClick={onAddTodo}>Save</button>
            </div>}

            <Button onClick={() => setTxtOpen(true)} className='add-btn'>Add an item</Button>
        </div>
    )
}
