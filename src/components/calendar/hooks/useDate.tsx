import { monthClass } from "../classes/classes"
import { constants } from "../constants"

export const useDate = () => {
    const today = new Date()

    const getDate = (date?: Date) => {
        const today: Date = date ? date : new Date()
        const year: number = today.getFullYear()
        const month: number = today.getMonth()
        const day: number = today.getDate()
        return { day, month, year }
    }

    const getDay = (day: number, month: number, year: number): number => {
        return new Date(year, month, day).getDay()
    }

    /**
     * @param type 10: day, 20: month
     * @param length 'short' | 'long' | 'narrow'
     * @returns returns a string with the named day or month
     */
    const getNamedDayOrMonth = (day: number, month: number, year: number, type: number, length: any): string => {
        const date = new Date(year, month, day)
        return date.toLocaleString('default', type === 10 ? { weekday: length } : type === 20 ? { month: length } : {}) //eslint-disable
    }

    const getLastDayOfMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getLastWeek = (month: number, year: number, firstDayOfWeek: number): number[] => {
        const lastDay: number = getLastDayOfMonth(month, year)
        const result: number[] = []

        for (let i = lastDay - firstDayOfWeek; i <= lastDay; i++) {
            result.push(i)
        }
        return result
    }

    const getMonthDays = (month: number, year: number, firstDayOfWeek: number): any[] => {
        const result: Object[] = []
        const firstDay = new Date(year, month).getDay() + firstDayOfWeek
        const totalDays = new Date(year, month + 1, 0).getDate()
        var totalDaysPrev = new Date(year, month, 0).getDate()

        for (let i = 1; i <= firstDay; i++) {
            let prevMonthDate = totalDaysPrev - firstDay + i
            let date = new Date(year, month - 1, prevMonthDate)
            result.push(new monthClass({ date: date, day: prevMonthDate, type: 'prev' }))
        }

        for (let i = 1; i <= totalDays; i++) {
            let date = new Date(year, month, i)
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                result.push(new monthClass({ date: date, day: i, type: 'current', current: true }))
            } else {
                result.push(new monthClass({ date: date, day: i, type: 'current' }))
            }
        }

        if (result.length < constants.views.month.numOfCells) {
            let count = constants.views.month.numOfCells - result.length
            for (let i = 1; i <= count; i++) {
                let date = new Date(year, month + 1, i)
                result.push(new monthClass({ date: date, day: i, type: 'next' }))
            }
        }
        console.log(result)
        return result
    }

    return {
        date: getDate(),
        getDate,
        getDay,
        getLastDayOfMonth,
        getNamedDayOrMonth,
        getLastWeek,
        getMonthDays
    }
}