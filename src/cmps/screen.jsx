
export const Screen = ({ cb }) => {

    const onHandleClick = (ev) => {
        console.log(ev);
        // ev.stopPropagation()
        // ev.preventDefault()
        cb()

    }
    return (
        <div
            className='screen'
            onClick={onHandleClick}>
        </div >)
}