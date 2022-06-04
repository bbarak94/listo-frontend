import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'

export const Comments = ({ task, previewIconStyle }) => {

    return (
        <>
            {task.comments?.length > 0 &&
                <div className="preview-small-icon" title='Comments'>
                    <ChatBubbleOutlineOutlinedIcon style={previewIconStyle} />
                </div>}
        </>
    )
}