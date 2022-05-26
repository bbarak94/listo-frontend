import members from '../assets/img/task/navbar/members.svg'
import dates from '../assets/img/task/navbar/dates.svg'
import custom from '../assets/img/task/navbar/custom.svg'
import settings from '../assets/img/task/navbar/settings.svg'
import VideoLabelOutlinedIcon from '@mui/icons-material/VideoLabelOutlined'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'

import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded'
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined'

export const TaskNavBar = () => {
    return (
        <div className='task-nav-bar flex column'>
            <div className='title-container flex'>
                <h1 className='title'>Add to card</h1>
                <div>
                    <img
                        src={settings}
                        alt='Settings'
                        style={{ width: '16px' }}
                    />
                </div>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <img
                        src={members}
                        alt='Members'
                        style={{ width: '18px' }}
                    />
                </div>
                <h2>Members</h2>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <TurnedInNotRoundedIcon
                        style={{ width: '16px', transform: 'rotate(45deg)' }}
                    />
                    {/* <img src={members} alt='Members' style={{ width: '18px' }} /> */}
                </div>
                <h2>Labels</h2>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <CheckBoxOutlinedIcon style={{ width: '16px' }} />
                    {/* <img src={members} alt='Members' style={{ width: '18px' }} /> */}
                </div>
                <h2>Checklist</h2>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <img src={dates} alt='Dates' style={{ width: '17px' }} />
                </div>
                <h2>Dates</h2>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <AttachFileIcon
                        style={{ width: '16px', transform: 'rotate(45deg)' }}
                    />
                    {/* <img src={members} alt='Members' style={{ width: '18px' }} /> */}
                </div>
                <h2>Attachment</h2>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <LocationOnIcon style={{ width: '16px' }} />
                    {/* <img src={members} alt='Members' style={{ width: '18px' }} /> */}
                </div>
                <h2>Location</h2>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <VideoLabelOutlinedIcon style={{ width: '16px' }} />
                    {/* <img src={VideoLabelOutlinedIcon} alt='Cover' style={{ width: '18px' }} /> */}
                </div>
                <h2>Cover</h2>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <img
                        src={custom}
                        alt='Custom Fields'
                        style={{ width: '18px' }}
                    />
                </div>
                <h2>Custom Fields</h2>
            </div>
        </div>
    )
}
