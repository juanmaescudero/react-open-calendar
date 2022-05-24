import styles from '../Calendar.module.css'
import { constants } from '../constants'
import { useDate } from '../hooks/useDate'

interface DayInterface {
    current: boolean
    date: Date
    day: number
    index: number
    uppercasedDays?: boolean
    type: string
}

export default function DayContainer ( props: DayInterface ) : JSX.Element {
    const { 
        day, 
        current, 
        index, 
        uppercasedDays, 
        date,
        type
    } = props
    const { getNamedDayOrMonth, getDate } = useDate()

    const currentDay = getDate(date)
    const { month, year } = currentDay
    
    const setNameDay = () => (
        index < constants.numDaysOfWeek && 
        <p className={styles['name-day']}>
            {   uppercasedDays ? 
                getNamedDayOrMonth(day, month, year, 10, 'short').toUpperCase() :
                getNamedDayOrMonth(day, month, year, 10, 'short') 
            }
        </p>
    )

    return(
        <div className={`${styles.day} 
        ${current && styles.today}
        ${styles[type]}`}>
            { setNameDay() }
            <p className={styles['num']}>{ day }</p>
        </div>
    )
}