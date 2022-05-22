export const useDate = () => {
    const getDate = () => {
        const date : Date = new Date()
        const year : number = date.getFullYear()
        const month : number = date.getMonth()
        const day : number = date.getDate()
        return { day, month, year }
    }

    /**
     * @param type 10: day, 20: month
     * @returns returns a string with the named day or month
     */
    const getNamedDayOrMonth = (day : number, month : number, year : number, type : number) : string => {
        const date = new Date(year, month, day)
        const dayName : string = date.toLocaleString('default', type === 10 ? { weekday: 'long' } : type === 20 ? { month: 'long' } : {})
        return dayName
    }

    const getLastDayOfMonth = (month : number, year : number) : number => {
        return new Date(year, month, 0).getDate()
    }

    return {
        date: getDate(),
        getLastDayOfMonth,
        getNamedDayOrMonth
    }
}