import { BoardList } from '../cmps/board-list'
import { AppHeader } from '../cmps/app-header'
import { SelectLabels } from '../cmps/select-labels'

import templates from '../assets/img/workspace/templates.svg'
import close from '../assets/img/workspace/close.svg'
import starStroke from '../assets/img/workspace/star-stroke.svg'
import clock from '../assets/img/workspace/clock.svg'



export const Workspace = () => {
    const categories = [
        'Popular', 'Small business', 'Design', 'Education', 'Engineering-IT', 'Marketing', 'Human-resources', 'Operations', 'Sales-CRM'
    ]

    return (<>
        <AppHeader />
        <div className='workspace'>

            <section className='starred-boards'>
                { }
            </section>
            <BoardList />
        </div>
    </>)
}

