import moment from 'moment'

export const TaskDetailsActivity = ({ activity, board }) => {
    return (
        <div className='task-details-activity flex'>
            <div
                className='user-container flex'
            >
                <img
                    src={activity.byMember.imgUrl}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                    }}
                />
            </div>

            <div className='txt flex column'>
                <h1>
                    {activity.byMember.fullname}{' '}
                    <span>
                        {activity.txt}
                    </span>{' '}
                    <span className='board-title'>
                        {(activity?.task?.title) ? activity.task.title : board.title}
                    </span>{' '}
                </h1>
                {(Date.now() - activity.createdAt < 30000) && <h2 className='date'> just now </h2>}
                {(Date.now() - activity.createdAt > 30000) && <h2 className='date'>{(moment(activity.createdAt).fromNow())}</h2>}
            </div>
        </div>
    )
}
