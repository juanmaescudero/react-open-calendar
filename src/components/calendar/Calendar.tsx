import { useState } from 'react'
import { useDate } from './hooks/useDate'
import styles from './Calendar.module.css'
import DayContainer from './components/DayContainer'
import { constants } from './constants'
import { type } from 'os'

/**
 * @param firstDayOfWeek 0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday
 * @param defaultView 'month' | 'week' | 'day'
 */
interface calendarInterface {
    firstDayOfWeek?: number
    defaultView?: string
    uppercasedDays?: boolean
}

export default function Calendar (props: calendarInterface) : JSX.Element {
    const { 
        firstDayOfWeek=0,
        defaultView='month',
        uppercasedDays=true
    } = props
    const { 
        date, 
        getLastDayOfMonth,
        getNamedDayOrMonth,
        getLastWeek,
        getMonthDays
    } = useDate()
    
    const [ day, setDay ] = useState(date.day)
    const [ month, setMonth ] = useState(date.month)
    const [ year, setYear ] = useState(date.year)
    const [ viewType, setViewType ] = useState(defaultView)
    const [ needPrintDay, setNeedPrintDay ] = useState(true)

    const namedMonth = getNamedDayOrMonth(day, month, year, 20, 'long')
    const lastDayOfMonth = getLastDayOfMonth(month, year)
    const classViewType = viewType === 'month' ? styles.month : viewType === 'week' ? styles.week : styles.day

    return(
        <section className={`${styles.calendar} ${classViewType}`}>
            <div className={styles['calendar-inputs']}>
                <button onClick={() => setDay(day - 1)}>DAY</button>
                <button onClick={() => setMonth(month - 1)}>{namedMonth}</button>
                <button onClick={() => setYear(year - 1)}>YEAR</button>
            </div>
            <div className={styles.month}>
                {
                    getMonthDays(month, year, firstDayOfWeek).map((d, index) => {
                        return (
                            <DayContainer 
                            key={`day-container-${index}`} 
                            day={d.day} 
                            date={d.date}
                            type={d.type}
                            current={d.current}
                            index={index}
                            uppercasedDays={uppercasedDays}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}