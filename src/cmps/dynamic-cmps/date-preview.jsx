import moment from 'moment';

export const DatePreview = ({ task, onOpenModal }) => {

    return (
        // <section>
            <div className="date-preview" onClick={() => onOpenModal('dates')}>
                {moment(task.dueDate).format('MMMM D YYYY [at] h:mm a')}
            </div>
        // </section>
    )
}