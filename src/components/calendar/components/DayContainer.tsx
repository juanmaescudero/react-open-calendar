import styles from '../Calendar.module.css'

interface DayInterface {
    currentDay: number
    day: number
}

export default function DayContainer ( props: DayInterface ) : JSX.Element {
    const { day, currentDay } = props

    return(
        <div className={`${styles.day} ${day === currentDay && styles.current}`}>
            {day}
        </div>
    )
}