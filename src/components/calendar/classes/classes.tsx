export interface monthInterface {
    date: Date
    day: number
    type: string
    current?: boolean
}

export class monthClass {
    date: Date
    day: number
    type: string
    current: boolean
    
    constructor (props: monthInterface) {
        this.date = props.date
        this.day = props.day
        this.type = props.type
        this.current = props.current || false
    }
}