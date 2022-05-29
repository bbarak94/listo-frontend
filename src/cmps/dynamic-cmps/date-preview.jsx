import moment from 'moment'

export const DatePreview = ({ task, onOpenModal }) => {
    return (
        <div className="due-date-preview-container">
                <h1>Due date</h1>
            <div className='date-preview flex justify-center' onClick={() => onOpenModal('dates')}>
                <h1>
                    {moment(task.dueDate).format('MMMM D YYYY [at] h:mm a')}
                </h1>
            </div>
            </div>
    )
}
