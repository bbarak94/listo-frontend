import members from '../../assets/img/task/navbar/members.svg'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
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
    }
}
