import { useState } from "react"
import { useDispatch } from "react-redux"

import { addTask } from "../../store/actions/board.action"

export const AddTask = ({ setExpandCardTitleId, expandCardTitleGroupId, groupId, boardId, isScrollBar }) => {

    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const onHandleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault()
        onAddTask()
    }

    const onEnterPress = (ev) => {
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            ev.preventDefault();
            onAddTask()
        }
    }

    const onAddTask = () => {
        if (title === '') return
        dispatch(addTask(title, boardId, groupId))
        setTitle('')
    }
    
    return (
        <div className="task-composer" style={{width: isScrollBar ? '248px' : '256px' }}>
            {expandCardTitleGroupId !== groupId && <div className="add-card flex align-center" onClick={() => setExpandCardTitleId(groupId)}>
                <span className="add-icon"></span>
                <span className="add-card-txt">Add a card</span>
            </div>}
            {expandCardTitleGroupId === groupId &&
                <form onSubmit={onHandleSubmit}>
                    <textarea
                        onKeyDown={onEnterPress}
                        autoFocus onChange={onHandleChange}
                        value={title}
                        placeholder="Enter a title for this card..."
                        spellCheck="false"
                    />
                    <div className='add-group-actions flex'>
                        <button className="btn">Add card</button>
                        <span className="close-btn" onClick={() => setExpandCardTitleId('')}></span>
                    </div>
                </form>
            }
        </div>
    )
}