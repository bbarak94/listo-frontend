import members from '../../assets/img/task/navbar/members.svg'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded'
import dates from '../../assets/img/task/navbar/dates.svg'
import add from '../../assets/img/members/add.svg'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


import { NewBoardPrev } from './new-board-prev'
export function DynamicBtn(props) {
    switch (props.name) {
        case 'new-board':
            return <NewBoardPrev {...props} />

        case 'members':
            return (
                <div {...props.bindTrigger(props.popupState)}>
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
                </div>
            )
        case 'members-prev':
            return (
                <div {...props.bindTrigger(props.popupState)}>
                    <button 
                    // onClick={() => onHandleClick('members')}
                    ><PersonOutlineIcon /><span>Change Members</span></button>
                </div>
            )
        case 'member':
            return (
                <div {...props.bindTrigger(props.popupState)}>
                    <img src={props.member.imgUrl} />
                </div>
            )

        case 'checklist':
            return (
                <div {...props.bindTrigger(props.popupState)}>
                    <div className='task-edit-btn flex align-center'>
                        <div>
                            <CheckBoxOutlinedIcon style={{ width: '16px' }} />
                        </div>
                        <h2>Checklist</h2>
                    </div>
                </div>
            )
        case 'labels':
            return (
                <div {...props.bindTrigger(props.popupState)}>
                    <div className='task-edit-btn flex align-center'>
                        <div>
                            <TurnedInNotRoundedIcon
                                style={{
                                    width: '16px',
                                    transform: 'rotate(45deg)',
                                }}
                            />
                        </div>
                        <h2>Labels</h2>
                    </div>
                </div>
            )
        case 'dates':
            return (
                <div {...props.bindTrigger(props.popupState)}>
                    <div className='task-edit-btn flex align-center'>
                        <div>
                            <img
                                src={dates}
                                alt='Dates'
                                style={{ width: '17px' }}
                            />
                        </div>
                        <h2>Dates</h2>
                    </div>
                </div>
            )
        case 'plus-members':
            return (
                <div {...props.bindTrigger(props.popupState)}>
                    <div className='plus-container flex'>
                        <img src={add} />
                    </div>
                </div>
            )
    }
}
