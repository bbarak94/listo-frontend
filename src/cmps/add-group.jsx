
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addGroup } from '../store/actions/board.action'

export const AddGroup = () => {

    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const params = useParams()

    const onHandleChange = ({ target }) => {
        setTitle(target.value)
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault()
        if (title === '') return
        dispatch(addGroup(title, params.boardId))
        setTitle('')
    }
    return (
        <div className="add-group">
            <form onSubmit={onHandleSubmit}>
                <button className='add-group-btn'>Add another list</button>
                <input type="text" placeholder="Enter list title..." onChange={onHandleChange} value={title} />
                <div className='add-group-actions flex'>
                    <button className="btn">Add list</button>
                    <span className='close-btn'></span>
                </div>
            </form>
        </div>
    )
}