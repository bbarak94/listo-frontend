import {NewBoardPopup} from './new-board-popup'
import {Members} from './members'
import {Checklist} from './checklist'
export function DynamicContent(props) {
    switch (props.name) {
        case 'new-board':
            return <NewBoardPopup {...props} />
        case 'members':
            return <Members {...props} />
        case 'checklist':
            return <Checklist {...props} />
    }
}
