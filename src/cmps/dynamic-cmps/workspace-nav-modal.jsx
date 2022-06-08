import { useNavigate } from "react-router-dom"

export const WorkspaceNavModal = () => {

    console.log('reached workspace');

    const navigate = useNavigate()



    const onViewWorkspace = () => {
        navigate('/workspace')
    }
    return (<>
        {<div className="label">
            <h1>Workspace</h1>
            <hr />
           
            <div className="view-workspace-btn" onClick={onViewWorkspace}>
            View Workspace page
            </div>
        </div>}
    </>)
}