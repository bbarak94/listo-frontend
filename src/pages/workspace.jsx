import { BoardList } from '../cmps/board-list'
import { AppHeader } from '../cmps/app-header'

export const Workspace = () => {

    return (
        <>
            <AppHeader />
            <div className='workspace'>
                <BoardList />
            </div>
        </>
    )
}

