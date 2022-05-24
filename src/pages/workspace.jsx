import { BoardList } from '../cmps/board-list'
import templates from '../assets/img/workspace/templates.svg'
import close from '../assets/img/workspace/close.svg'
import {SelectLabels} from '../cmps/select-labels'


export const Workspace = () => {
    const categories = [
        'Popular','Small business','Design','Education','Engineering-IT','Marketing','Human-resources','Operations','Sales-CRM'
    ]
    return (
        <div className='board-list'>
            <div className='title flex'>
                <div className='flex align-center'>
                    <div className='icon-container'>
                        <img
                            src={templates}
                            alt='templates'
                            style={{ width: '25px' }}
                        />
                    </div>
                    <h2>Most popular templates</h2>
                </div>
                <div className='icon-container close flex align-center justify-center'>
                    <img
                        src={close}
                        alt='templates'
                        style={{ width: '25px' }}
                    />
                </div>
            </div>
                <div className='flex align-center'>
                    <h3>
                        Get going faster with a template from the Listo
                        community or
                    </h3>
                    <div>
            <SelectLabels categories={categories} />
                    </div>
                </div>
            <BoardList />
        </div>
    )
}
