import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../store/actions/board.action'

export const GroupTitleEdit = ({ groupTitle, group, boardId }) => {
    const [title, setTitle] = useState(groupTitle)
    const dispatch = useDispatch()
    // const inputRef = inputRef()
    const onHandleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onEnterPress = (ev) => {
        if (ev.keyCode == 13 && ev.shiftKey == false) {
            ev.preventDefault()
            ev.target.blur()
            onUpdateGroup()
        }
    }

    const onHandleSubmit = (ev) => {
        if (ev) ev.preventDefault()
        onUpdateGroup()
    }
    const onUpdateGroup = () => {
        let newGroup = { ...group }
        newGroup.title = groupTitle
        dispatch(updateGroup(newGroup, boardId))
    }

    return (
        <div className='group-title'>
            <input
                // ref={inputRef}
                type='text'
                onFocus={(ev) => ev.target.select()}
                value={title}
                onChange={onHandleChange}
                onKeyDown={onEnterPress}
                onBlur={onHandleSubmit}
                onMouseDown={(ev)=>ev.preventDefault()}
                onMouseUp={(ev)=>ev.target.focus()}
            />
        </div>
    )
}
