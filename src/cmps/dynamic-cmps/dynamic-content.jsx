import { AddBoard } from './add-board'
import { Checklist } from './checklist'
import { Cover } from './cover'
import { Labels } from './labels'
import { Members } from './members'
import { Member } from './member'
import { Dates } from './dates'
export function DynamicContent(props) {
    switch (props.name) {
        case 'new-board':
            return <AddBoard {...props} />
        case 'members':
            return <Members {...props} />
        case 'members-prev':
            return <Members {...props} />
        case 'member':
            return <Member {...props} />
        case 'plus-members':
            return <Members {...props} />
        case 'checklist':
            return <Checklist {...props} />
        case 'cover':
            return <Cover {...props} />
        case 'labels':
            return <Labels {...props} />
        case 'dates':
            return <Dates {...props} />
    }
}
