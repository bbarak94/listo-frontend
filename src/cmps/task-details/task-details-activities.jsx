import { useState } from 'react'

import { TaskDetailsActivity } from './task-details-activity.jsx'
import { TaskDetailsComments } from './task-details-comments.jsx'

import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import Button from '@mui/material/Button'

export const TaskDetailsActivities = ({ task, board, groupId }) => {
    const [isActivitiesOpen, setIsActivitiesOpen] = useState(false)
    
    return (
        <div className='task-details-activities'>
            <div className='activity-header flex'>
                <div className='left-container flex'>
                    <div className='task-details-left-icon activity-icon-container'>
                        <FormatListBulletedRoundedIcon style={{color: '#5e6c84'}} />
                    </div>
                    <h3>Activity</h3>
                </div>
                {isActivitiesOpen && (
                    <Button
                        onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                    >
                        Hide Details
                    </Button>
                )}
                {!isActivitiesOpen && (
                    <Button
                        onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                    >
                        Show Details
                    </Button>
                )}
            </div>

            <TaskDetailsComments task={task} board={board} groupId={groupId} />

            {isActivitiesOpen && (
                <div>
                    {board.activities.map((activity, idx) => {                        
                        return (
                            <TaskDetailsActivity
                                key={idx}
                                activity={activity}
                                task={task}
                                board={board}
                                groupId={groupId}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
