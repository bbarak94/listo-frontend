import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { updateTask } from '../../store/actions/board.action'

export const Cover = ({ task, board, group, handleClose }) => {

    const dispatch = useDispatch()
    const [selectedBg, setSelectedBg] = useState()

    const colors = [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D'
    ]

    const imgUrls = [
        'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        'https://images.unsplash.com/photo-1459213599465-03ab6a4d5931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
        'https://images.unsplash.com/photo-1438786657495-640937046d18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    ]
    // const imgUrls = [
    //     'https://images.unsplash.com/photo-1631116616602-322db356c4fb?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
    //     'https://images.unsplash.com/photo-1497276236755-0f85ba99a126?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
    //     'https://images.unsplash.com/photo-1651438416370-39729e9d43af?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074',
    //     'https://images.unsplash.com/photo-1653216977231-bd0a1ec414f6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
    //     'https://images.unsplash.com/photo-1631624729083-c64035648cfb?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
    //     'https://images.unsplash.com/photo-1644797694478-d12d4eab8cd8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880'
    // ]

    const onSetCoverColor = (color) => {
        setSelectedBg(color)
        const taskToUpdate = { ...task }
        taskToUpdate.style.color = color
        taskToUpdate.style.imgUrl = null
        dispatch(updateTask(taskToUpdate, board._id, group.id))
    }

    const onSetCoverImg = (imgUrl) => {
        setSelectedBg(imgUrl)
        const taskToUpdate = { ...task }
        taskToUpdate.style.color = null
        taskToUpdate.style.imgUrl = imgUrl
        dispatch(updateTask(taskToUpdate, board._id, group.id))
    }

    const setCoverSize = () => {
        const taskToUpdate = { ...task }
        taskToUpdate.style.isCoverSizeBig = !taskToUpdate.style.isCoverSizeBig
        dispatch(updateTask(taskToUpdate, board._id, group.id))
    }

    const sizeStyle = {
        backgroundColor: task.style.color,
        backgroundImage: `url(${task.style.imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 1,
    }

    if (!task) return <div>Loading...</div>

    return (
        <div className="cover flex column">
            <div className="popup-header flex align-center justify-center">
                Cover
                <span
                    className='close-btn'
                    style={{ position: 'absolute', right: 0 }}
                    onClick={() => handleClose()}
                >
                </span>
            </div>
            <div>
                <h4>Size</h4>
                {/* ********Cover Method Selection******** */}
                <div className="_3DrR3DNGRm88rQ">
                    <div role="button" className="isvr-Reb94vq0g c2K-XOKpsarOtb _2pFmKTmyH7T3W8" onClick={setCoverSize}>
                        <div className="_28YCxuL0b0PLJg" style={task.style.isCoverSizeBig ? {} : sizeStyle}>
                        </div>
                        <div className="_2_NkiO6b3w-TwP" >
                            <div className="_3zyygYjXmBCuZ8">
                            </div>
                            <div className="_2YkoNjZbIBZjxA">
                            </div>
                            <div className="_3KUp4qsMp7f0nZ">
                                <div className="_2TkMxnIj6-MZD9">
                                </div>
                                <div className="_2TkMxnIj6-MZD9">
                                </div>
                            </div>
                            <div className="_3K8WSoeRLtPYZP">
                            </div>
                        </div>
                    </div>
                    <div role="button" className="isvr-Reb94vq0g _3bvxiZCqVvPKiY _2pFmKTmyH7T3W8" style={task.style.isCoverSizeBig ? sizeStyle : {}} onClick={setCoverSize}>
                        <div className="_2_NkiO6b3w-TwP">
                            <div className="_3zyygYjXmBCuZ8">
                            </div>
                            <div className="_2YkoNjZbIBZjxA">
                            </div>
                            <div className="_3KUp4qsMp7f0nZ">
                                <div className="_2TkMxnIj6-MZD9">
                                </div>
                                <div className="_2TkMxnIj6-MZD9">
                                </div>
                            </div>
                            <div className="_3K8WSoeRLtPYZP">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='btn' onClick={() => onSetCoverColor(null)}>Remove cover</div>
            <h4>Colors</h4>
            <div className='cover-colors'>
                {colors.map((color, idx) =>
                    <div
                        key={idx}
                        className={`color-container ${selectedBg === color && 'selectedBgClass'}`}
                        onClick={() => onSetCoverColor(color)}
                        style={{ backgroundColor: color }}
                    >
                    </div>
                )}
            </div>
            <h4>Photos from Unsplash</h4>
            <div className='cover-imgs'>
                {imgUrls.map((url, idx) =>
                    <div
                        key={idx}
                        className={`img-container`}
                        onClick={() => onSetCoverImg(url)}
                    >
                        <img className={(selectedBg === url) ? 'selectedBgClass' : ''} src={url} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}
