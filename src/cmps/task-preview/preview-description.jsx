import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'

export const Description = ({ task, previewIconStyle }) => {

    return (
        <>
            {task.description &&
                <div className="preview-small-icon" title='This card has a description'>
                    <ArticleOutlinedIcon style={previewIconStyle} />
                </div>}
        </>
    )
}