import { constantsCalendar } from "../constants"

export const useDate = () => {
    const getDate = () => {
        const date: Date = new Date()
        const year: number = date.getFullYear()
        const month: number = date.getMonth()
        const day: number = date.getDate()
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
    const getNamedDayOrMonth = (day: number, month: number, year: number, type: number, length: string): string => {
        const date = new Date(year, month, day)
        return date.toLocaleString('default', type === 10 ? { weekday: length }: type === 20 ? { month: length }: {}) //eslint-disable
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

    return {
        date: getDate(),
        getDay,
        getLastDayOfMonth,
        getNamedDayOrMonth,
        getLastWeek
    }
}