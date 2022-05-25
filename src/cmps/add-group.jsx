
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addGroup, loadBoards, setBoard } from '../store/actions/board.action'

export const AddGroup = () => {

    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const params = useParams()

    const onHandleChange = ({ target }) => {
        setTitle(target.value)
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault()
        dispatch(addGroup(title, params.boardId))
    }
    return <div className="add-group">
        <form onSubmit={onHandleSubmit}>
            <input type="text" placeholder="Enter list title..." onChange={onHandleChange} value={title} />
            <div className='add-group-actions flex'>
                <button className="btn">Add list</button>
                <a href="#"></a>
            </div>
        </form>
    </div>
}