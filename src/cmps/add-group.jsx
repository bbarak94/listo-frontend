
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addGroup } from '../store/actions/board.action'

export const AddGroup = () => {

    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const params = useParams()

    const [isAddGroupOpen, setAddGroupOpen] = useState(false)

    const onHandleChange = ({ target }) => {
        setTitle(target.value)
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault()
        if (title === '') return
        dispatch(addGroup(title, params.boardId))
        setTitle('')
        setAddGroupOpen(false)
    }

    return (<>
        {!isAddGroupOpen && <div className='add-group-btn' onClick={() => setAddGroupOpen(true)}>
            <span className="add-icon"></span>
            Add another list
        </div>}
        {isAddGroupOpen && <div className="add-group">
            <form onSubmit={onHandleSubmit}>
                <div>
                    <input type="text" placeholder="Enter list title..." onChange={onHandleChange} value={title} autoFocus />
                    <div className='add-group-actions flex'>
                        <button className="btn">Add list</button>
                        <span className='close-btn' onClick={() => setAddGroupOpen(false)}></span>
                    </div>
                </div>
            </form>
        </div>}
    </>
    )
}