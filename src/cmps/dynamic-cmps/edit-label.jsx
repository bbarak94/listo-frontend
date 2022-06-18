import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { saveBoard } from "../../store/actions/board.action"
import { labelService } from "../../services/label.service"
import { useForm } from "../../hooks/useForm"
import { utilService } from "../../services/util.service"

export const EditLabel = ({ board, labelId, task, handleClose }) => {
    const dispatch = useDispatch()
    const noColorIndication = '#B3BAC5'
    let [label, handleChange, setLabel] = useForm(null)

    useEffect(() => {
        loadLabel()
    }, [])

    const loadLabel = () => {
        label = labelId ? labelService.getById(labelId) : labelService.getEmptyLabel()
        setLabel(label)
    }

    const onSaveLabel = (ev) => {
        ev.preventDefault()
        label.id = utilService.makeId()
        board.labels.unshift(label)
        dispatch(saveBoard(board))
        handleClose()
    }

    if (!label) return
    
    return (
        <div className="edit-label">
            <div className="label-edit-header flex aline-center justify-center">
                <h1>Creat labels</h1>
            </div>
            <hr />
            <label htmlFor="">Name</label>
            <form onSubmit={onSaveLabel}>
                <input type="text" onChange={handleChange} value={label?.title} name="title" autoFocus />
                <label >Select a color</label>
                <div className="edit-label-color-container flex">
                    {labelService.getBasicColors().map((clr, idx) => {
                        return <div onClick={() => setLabel({ ...label, color: clr })} key={idx}
                            className={`adit-label-color ${label.color === clr ? 'selected-clr' : ''}`}
                            style={{ background: clr }}></div>
                    })}
                </div>
                <div className="no-color-label-container flex">
                    <div className={`no-color-label ${label.color === noColorIndication ? 'selected-clr' : ''}`}
                        onClick={() => setLabel({ ...label, color: noColorIndication })}
                        style={{ background: noColorIndication }}></div>
                    <div className="no-color-desc">
                        <p>No color.</p>
                        <p>This won't show up on the front of cards.</p>
                    </div>
                </div>
                <div className="edit-label-btn-container flex">
                    <button className="create-label-btn"  >Create</button>
                </div>
            </form>
        </div>
    )
}