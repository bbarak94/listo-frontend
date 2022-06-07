import { labelService } from "../../services/label.service"

const NO_COLOR_INDICATION = '#B3BAC5'

export const Labels = ({ board, task, labelExpandClass,
    titleLabelClass, setLabelExpand, setLabelTitleDelay, isCmpFromTaskEdit }) => {

    const onExpandLabels = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        labelExpandClass = (labelExpandClass === 'expand') ? 'shrink' : 'expand'
        setLabelExpand(labelExpandClass)
        setLabelTitleDelay(labelExpandClass)
    }

    if (!task.labelIds?.length > 0) return
    
    return (
        <>

            <div className='task-preview-labels flex'>
                {labelService.getLabelsByIds(task.labelIds, board).map((label) => {
                    return (label.color !== NO_COLOR_INDICATION && <div key={label.id}
                        className={`task-preview-label ${labelExpandClass}`} onClick={onExpandLabels}
                        style={{ backgroundColor: label.color, }} >
                        <span className={titleLabelClass}>{label.title}</span>
                    </div>
                    )
                })}
            </div>


        </>
    )
}