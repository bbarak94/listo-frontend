import { userService } from '../services/user.service'
import { useSelector } from 'react-redux'


export const TaskDetailsActivity = ({ activity, task, board, groupId }) => {
    // const { user } = useSelector((storeState) => storeState.userModule)
    // const user = userService.getById(activity.byMember.id)
    // console.log('user:', user)
    // console.log('activity:', activity)

    return (
        <div className='task-details-activity flex'>
            <div
                className='user-container flex'
            // onClick={() => onOpenModal('member', user)}
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

            <div className='txt flex'>
                <h1>
                    {activity.byMember.fullname}{' '}
                    <span>
                        {activity.txt} {task.title}
                    </span>{' '}
                </h1>
            </div>
        </div>
    )
}
