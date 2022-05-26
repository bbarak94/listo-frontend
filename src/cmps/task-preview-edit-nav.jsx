import CreditCardIcon from '@mui/icons-material/CreditCard';
import LabelIcon from '@mui/icons-material/Label';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArchiveIcon from '@mui/icons-material/Archive';

export const TaskEditPreviewNav = () => {

    const card = <CreditCardIcon />
    const label = <LabelIcon />
    const member = <PersonOutlineIcon />
    const cover = <WallpaperIcon />
    const move = <ArrowForwardIcon />
    const copy = <ContentCopyIcon />
    const dates = <ScheduleIcon />
    const archive = <ArchiveIcon />

    const editors = [
        { title: 'Open Card', icon: card },
        { title: 'Edit labels', icon: label },
        { title: 'Change Members', icon: member },
        { title: 'Change Cover', icon: cover },
        { title: 'Move', icon: move },
        { title: 'Copy', icon: copy },
        { title: 'Edit Dates', icon: dates },
        { title: 'Archive', icon: archive },
    ]


    return (
        <nav className="task-edit-nav">
            {editors.map(editor =>
                <button>{editor.icon}{editor.title}</button>
            )}
        </nav>
    )
}