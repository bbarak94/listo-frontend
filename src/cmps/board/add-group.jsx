import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addGroup } from '../../store/actions/board.action'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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

    const addGroupClass = isAddGroupOpen ? 'open' : ''

    return (
        <section style={{ position: 'relative' }}>
            <div className={`add-group-btn ${addGroupClass}`} onClick={() => setAddGroupOpen(true)}>
                <span className="add-icon"></span>
                Add another list
            </div>
            <div className={`add-group ${addGroupClass}`}>
                <form onSubmit={onHandleSubmit}>
                    <div>
                        <input className={addGroupClass} type="text" placeholder="Enter list title..." onChange={onHandleChange} value={title} />
                        <div className='add-group-actions flex align-center'>
                            <button className={`btn ${addGroupClass}`}>Add list</button>
                            <CloseRoundedIcon className={`close-add-group ${addGroupClass}`} onClick={() => setAddGroupOpen(false)} />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}