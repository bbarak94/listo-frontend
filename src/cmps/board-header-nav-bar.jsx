


export const BoardHeaderNavBar = ({ board, onOpenModal }) => {






    return (<>

        <div className="board-header-right-container">
            <div className="board-title-btn">
                <h2>{board.title}</h2>
            </div>

            <div className="star-btn">
                {/* <input type="checkbox" className="star" checked /> */}
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

            <div className="show-menu-btn"><span>... Show menu</span> </div>

        </div>

    </>)
}