import moment from 'moment';
import { useEffect, useState } from 'react';
import { useEffectUpdate } from '../../hooks/useEffectUpdate';

import { DynamicContent } from './dynamic-content';

import { Dates } from './dates'

export const DatePreview = ({ task }) => {

    const [isDateExpand, setIsDateExpand] = useState(false)

    useEffectUpdate(() => {
        setIsDateExpand(false)
    }, [task])

    return (
        <section>
            <div className="date-preview" onClick={() => setIsDateExpand(true)}>
                <span>{moment(task.dueDate).format('MMMM D YYYY [at] h:mm a')}</span>
            </div>
            {isDateExpand && <DynamicContent name={'dates'} />}
        </section>
    )
}