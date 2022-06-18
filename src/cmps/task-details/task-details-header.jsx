import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp'

export const TaskDetailsHeader = ({ groupTitle, taskTitle }) => {

    return (
        <header className='task-details-header flex'>
            <div className='flex left-side'>
                <CreditCardSharpIcon className='credit-card-icon' />
                <div className='title flex column'>
                    <h1>{taskTitle}</h1>
                    <h2>
                        in list{' '}
                        <span>{groupTitle}</span>
                    </h2>
                </div>
            </div>
        </header>
    )
}