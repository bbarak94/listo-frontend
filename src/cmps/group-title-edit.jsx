import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../store/actions/board.action'

export const GroupTitleEdit = ({ groupTitle, group, boardId }) => {
    const [title, setTitle] = useState(groupTitle)
    const [isEdit, setIsEdit] = useState(false)
    const inputRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        isEdit && inputRef.current.focus()
    }, [isEdit])
    // const inputRef = inputRef()
    const onHandleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onEnterPress = (ev) => {
        if (ev.keyCode == 13 && ev.shiftKey == false) {
            ev.preventDefault()
            ev.target.blur()
        }
    }

    const onHandleSubmit = (ev) => {
        // console.log('ev.target.value:',ev.target.value)
        if (ev.target.value) ev.preventDefault()
        onUpdateGroup(ev.target.value)
    }

    const onUpdateGroup = (title) => {
        let newGroup = { ...group }
        newGroup.title = title
        dispatch(updateGroup(newGroup, boardId))
        setIsEdit(false)
    }

    return (
        <div className='group-title'>
            {(isEdit) && (
                <input
                    ref={inputRef}
                    dir="auto"
                    type='text'
                    // onFocus={(ev) => ev.target.select()}
                    value={title}
                    onChange={onHandleChange}
                    onKeyDown={onEnterPress}
                    onBlur={onHandleSubmit}
                // onMouseDown={(ev) => ev.preventDefault()}
                // onMouseUp={(ev) => ev.target.focus()}
                />
            )}
            {(!isEdit) && (
                <p
                    onClick={() => {
                        setIsEdit(true)
                    }}
                >{title}</p>
            )}

        </div>
    )
}
