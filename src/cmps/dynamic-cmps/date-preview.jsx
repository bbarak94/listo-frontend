import { useDispatch } from 'react-redux'

import { updateTask } from '../../store/actions/board.action'

import moment from 'moment'

export const DatePreview = ({ board, group, task, onOpenModal }) => {
    const dispatch = useDispatch()

    const onCompleteTask = (ev) => {
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
        else if (task.dueDate < Date.now()) return 'This card is past due'
        else return 'This card is due later'
    }

    const getDateState = () => {
        if (task.isComplete) return 'complete'
        else if (task.dueDate < Date.now()) return 'overdue'
        else return ''
    }
    
    return (
        <div className="due-date-preview-container" title={dateTitle()} onClick={(ev) => onOpenModal(ev, 'dates')}>
            <h1>Due date</h1>
            <div className='date-preview flex column justify-center' >
                <p className='flex align-center'>
                    <input type="checkbox" onClick={(ev)=>ev.stopPropagation()} onChange={onCompleteTask} checked={task.isComplete}/>
                    {moment(task.dueDate).format('MMMM D YYYY [at] h:mm a')}
                    <span className={dateClass}>{getDateState()}</span>
                </p>
            </div>
        </div>
    )
}
