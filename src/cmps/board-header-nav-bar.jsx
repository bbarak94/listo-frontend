

import { useState } from 'react'
import { AppModal } from './app-modal'

export const BoardHeaderNavBar = ({ board, onOpenModal }) => {
    
    
    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    
    return (<>
        <div className="board-header-right-container">
            <div className="board-title-btn">
                <h2>{board.title}</h2>
            </div>
            <div className="workspace-btn" onClick={() => onOpenModal('workspace-nav-modal')} >
                <span>  Workspace</span>
            </div>
            <div className='members-list-container flex column'>
                <div className='members-avatars-container flex'>
                    {board.members.map((member, idx) => {
                        return (
                            <div key={idx} className='member-container flex' onClick={() => onOpenModal('member', member)}>
                                <img src={member.imgUrl} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        <div className="board-header-left-container">

            <div className="show-menu-btn" onClick={() => onOpenModal('menu')}><span>... Show menu</span> </div>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                board={board}
            />

        </div>

    </>)
}