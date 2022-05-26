<<<<<<< HEAD
import {NewBoardPopup} from './new-board-popup'
import {Members} from './members'
import {Checklist} from './checklist'
=======
import { NewBoardPopup } from './new-board-popup'
import { Checklist } from './checklist'
import { Cover } from './cover'
import { Labels } from './labels'
>>>>>>> 554b9a0f11d96196a2f08b4c1d5260b5cde4c107
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
