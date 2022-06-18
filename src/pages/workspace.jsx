import { BoardList } from '../cmps/board/board-list'
import { AppHeader } from '../cmps/headers/app-header'

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

