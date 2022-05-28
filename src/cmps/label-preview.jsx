import { useEffect, useRef } from "react"

import add from '../assets/img/icon/add.svg'

export const LabelPreview = ({ board, task, onOpenModal }) => {

    const currLabelsRef = useRef([])


    const getTasksLabels = () => {
        if (!board.labels?.length
            || !task.labelIds?.length) return null
        const currLabels = []
        board.labels.forEach(label => {
            if (task.labelIds.includes(label.id))
                currLabels.push(label)
        })
        return currLabels
    }

    const labels = getTasksLabels()
    if (!labels) return
    return (
        <>
            <div className="label-preview-container">
                <h1> Labels</h1>
                {/* <div className="label-preview-flex" > */}
                <div className="label-preview-flex" onClick={() => onOpenModal('labels')}>

                    {labels.map(l => {
                        return <div key={l.id} className="label-preview" style={{ backgroundColor: l.color }}>
                            <span>{l.title}</span>
                        </div>
                    }
                    )}
                    <div className="label-preview-add">
                        <img src={add} alt="Add" />
                    </div>
                </div>
            </div>
        </>

    )
}

