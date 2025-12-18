export const formatDateAndTime = (dateP: Date | string | number) => {
    let date = dateP as Date
    if (!(dateP instanceof Date))
        date = new Date(Number(dateP))

    const day = date.toDateString()
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    return {day, time}
}