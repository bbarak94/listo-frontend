export function NewBoardPrev({ popupState, bindTrigger }) {
    return (
        <div
            {...bindTrigger(popupState)}
            className='board-preview-btn flex column align-center justify-center'
        >
            <div className="flex">
                <h2>create new board</h2>
            </div>
        </div>
    )
}
