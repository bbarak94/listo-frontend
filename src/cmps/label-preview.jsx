import { useEffect, useRef } from "react"

export const LabelPreview = ({ board, task }) => {
    console.log('task', task)
    const currLabelsRef = useRef([])

    useEffect(() => {
        currLabelsRef.current = getTasksLabels([])
    }, [board])

    const getTasksLabels = () => {
        if (!board.labels || !board.labels.length
            || !task.labelIds || !task.labelIds.length) return null
        const currLabels = []
        board.labels.forEach(label => {
            if (task.labelIds.includes(label.id))
                currLabels.push(label)
        })
        return currLabels
    }


    // if (!currLabelsRef.current) return 
    return (
        <>
            <div className="label-preview-container">
                <h1> Labels</h1>
                <div className="label-preview-flex">

                {currLabelsRef.current.map(l => {
                    return <div key={l.id} className="label-preview" style={{ backgroundColor: l.color }}>
                        <span>{l.title}</span>
                        {/* <span>{l.color}</span> */}
                    </div>
                }
                )}
                </div>
            </div>
        </>

    )
}

