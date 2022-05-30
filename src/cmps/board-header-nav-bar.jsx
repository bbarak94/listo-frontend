

import { height } from '@mui/system'
import { useState } from 'react'
import { AppModal } from './app-modal'

export const BoardHeaderNavBar = ({ board }) => {


    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')

    const onOpenModal = (ev, type, member) => {
        setIsOpen(true)
        setCmpType(type)

        let elemRect = ev.target.parentNode.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.target.offsetHeight
        // setModalPosition({top, left, height})
    }



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

            <div className="show-menu-btn" onClick={(ev) => onOpenModal(ev, 'menu')}>

                <span>... Show menu</span> </div>


            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                board={board}
                position={{ top: '43px', right: '0' }}
            />

        </div>

    </>)
}