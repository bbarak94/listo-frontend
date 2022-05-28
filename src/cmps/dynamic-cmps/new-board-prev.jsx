import { useState } from 'react'

import { AppModal } from '../app-modal'

export function NewBoardPrev() {

    const [isOpen, setIsOpen] = useState(false)

    const onAddBoard = () => {
        setIsOpen(true)
    }
    return (
        <>
            <div onClick={onAddBoard} className='board-preview-btn flex column align-center justify-center'>
                <div className="flex">
                    <h2>create new board</h2>
                </div>
            </div>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={'add-board'}
            />
        </>
    )
}
