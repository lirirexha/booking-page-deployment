import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'

export const formatDateAndTime = (dateP: Date | string | number) => {
    dayjs.extend(utc)
    const date = dayjs.utc(dateP)

    const day = date.format('ddd, MMM DD YYYY')
    const time = date.format("hh:mm A")

    return {day, time}
}