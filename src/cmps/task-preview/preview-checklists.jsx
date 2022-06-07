import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'

export const Checklists = ({ task, previewIconStyle }) => {

    const getChecklistData = () => {
        var todoCount = 0
        var doneCount = 0
        task.checklists.forEach(checklist => {
            checklist.todos.forEach(todo => {
                todoCount++
                if (todo.isDone) doneCount++
            })
        })
        return `${doneCount}/${todoCount}`
    }

    return (
        <>
            {task.checklists?.length > 0 &&
                <div className="preview-small-icon" title='Checklist items'>
                    <LibraryAddCheckOutlinedIcon style={previewIconStyle} />
                    <span>{getChecklistData()}</span>
                </div>}
        </>
    )
}