import {NewBoardPopup} from './new-board-popup'
import {Checklist} from './checklist'
export function DynamicContent(props) {
    switch (props.name) {
        case 'new-board':
            return <NewBoardPopup {...props} />
        case 'members':
            return <NewBoardPopup {...props} />
        case 'checklist':
            return <Checklist {...props} />
    }
}
