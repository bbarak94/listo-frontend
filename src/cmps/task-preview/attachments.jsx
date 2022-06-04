import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'


export const Attachments = ({ task, previewIconStyle }) => {

    return (
        <>
            {task.attachments?.length > 0 &&
                <div className="preview-small-icon" title='Attachments'>
                    <AttachFileOutlinedIcon style={previewIconStyle} />
                </div>}
        </>
    )
}