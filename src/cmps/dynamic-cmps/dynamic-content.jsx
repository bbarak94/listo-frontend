import { NewBoardPopup } from './new-board-popup'
import { Checklist } from './checklist'
import { Cover } from './cover'
import { Labels } from './labels'
import {Members} from './members'
export function DynamicContent(props) {
    switch (props.name) {
        case 'new-board':
            return <NewBoardPopup {...props} />
        case 'members':
            return <Members {...props} />
        case 'checklist':
            return <Checklist {...props} />
        case 'cover':
            return <Cover {...props} />
        case 'labels':
            return <Labels {...props} />
    }
}
