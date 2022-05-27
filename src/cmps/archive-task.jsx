
import custom from '../assets/img/task/navbar/custom.svg'

export const ArchiveTask = ({ board, task }) => {



    const yess = ()=>{
        console.log('yesss');
    }


    return (
        <div className='task-edit-btn flex align-center' onClick={yess} >
            <div>
                <img
                    src={custom}
                    alt='Custom Fields'
                    style={{ width: '18px' }}
                />
            </div>
            <h2>Archive</h2>
        </div>
    )

}