import { useState } from 'react'
import { useDate } from './hooks/useDate'
import styles from './Calendar.module.css'
import DayContainer from './components/DayContainer'
import { constantsCalendar } from './constants'

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
        firstDayOfWeek=1,
        defaultView='month',
        uppercasedDays=true
    } = props
    const { 
        date, 
        getLastDayOfMonth,
         getNamedDayOrMonth,
         getLastWeek
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
            <div className={styles['days-of-week']}>
                {
                    [...Array(constantsCalendar.daysOfWeek)].map((_, i) => {
                        const day:string = getNamedDayOrMonth(i + 1 + firstDayOfWeek, month, year, 10, 'short')
                        return <p>{ uppercasedDays ? day.toUpperCase() : day }</p>
                    })
                }
            </div>
            <div className={`${styles.month} ${styles['first-row']}`}>
                {
                    [...Array(getLastWeek(month - 1, year, firstDayOfWeek))].map((_, index) => {
                        return (
                            <DayContainer 
                            key={`day-container-${index}`} 
                            day={index + 1} 
                            currentDay={day}/>
                        )
                    })
                }
                {
                    [...Array(firstDayOfWeek)].map((_, index) => {
                        return (
                            <DayContainer 
                            key={`day-container-${index}`} 
                            day={index + 1} 
                            currentDay={day}/>
                        )
                    })
                }
            </div>
            <div className={styles.month}>
                {
                    [...Array(lastDayOfMonth)].map((_, index) => {
                        console.log(index, lastDayOfMonth)
                        if (lastDayOfMonth > index + 1) {
                        return (
                            <DayContainer 
                            key={`day-container-${index}`} 
                            day={index + 1 + firstDayOfWeek} 
                            currentDay={day}/>
                        )
                    }
                    })
                }
            </div>
        </section>
    )
}