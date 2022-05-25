
import close from '../assets/img/workspace/close.svg'

export const AddGroup = () => {

    return <div className="add-group">
        <form>
            <input type="text" placeholder="Enter list title..." />
            <div className='add-group-actions flex'>
                <button className="btn">Add list</button>
                <a href="#"></a>
            </div>
        </form>
    </div>
}