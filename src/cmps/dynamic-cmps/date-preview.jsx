import moment from 'moment';
export const DatePreview = ({ task }) => {

    return (
        <div className="date-preview">
            {moment(task.dueDate).format('MMMM D YYYY [at] h:mm a')}
        </div>
    )
}