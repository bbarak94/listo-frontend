import members from '../assets/img/task/navbar/members.svg'
import custom from '../assets/img/task/navbar/custom.svg'
import settings from '../assets/img/task/navbar/settings.svg'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { DynamicPopup } from './dynamic-cmps/dynamic-cmp'
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded'

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
            <DynamicPopup name={'members'} />
            <DynamicPopup name={'labels'} />
            <DynamicPopup name={'checklist'} />
            <DynamicPopup name={'dates'} />
            <div className='task-edit-btn flex align-center'>
                <div>
                    <AttachFileIcon
                        style={{ width: '16px', transform: 'rotate(45deg)' }}
                    />
                </div>
                <h2>Attachment</h2>
            </div>
            <div className='task-edit-btn flex align-center'>
                <div>
                    <LocationOnIcon style={{ width: '16px' }} />
                </div>
                <h2>Location</h2>
            </div>
            <DynamicPopup name={'cover'} />
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
