import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateGroup } from "../store/actions/board.action"

export const GroupTitleEdit = ({ groupTitle, groupId, boardId }) => {

    const [title, setTitle] = useState(groupTitle)
    const dispatch = useDispatch()

    const onHandleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const onEnterPress = (ev) => {
        if (ev.keyCode == 13 && ev.shiftKey == false) {
            ev.preventDefault();
            ev.target.blur()
            onUpdateGroup()
        }
    }

    const onHandleSubmit = (ev) => {
        if (ev) ev.preventDefault()
        onUpdateGroup()
    }
    const onUpdateGroup = () => {
        dispatch(updateGroup(boardId, groupId, title))
    }

    return (
        <div className="group-title">
            <input
                type='text'
                onFocus={(ev) => ev.target.select()}
                value={title} 
                onChange={onHandleChange}
                onKeyDown={onEnterPress}
                onBlur={onHandleSubmit}
            />
        </div>
    )
}