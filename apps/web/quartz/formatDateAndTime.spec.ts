import { formatDateAndTime } from "./formatDateAndTime";

describe("formatDateAndTime", () => {
    it('formats a Date object correctly', () => {
        const date =  new Date('2025-01-10T14:30:00Z')

        const result = formatDateAndTime(date)

        expect(result.day).toBe('Fri, Jan 10 2025')
        expect(result.time).toBe('02:30 PM')
    })

    it('formats a date number correctly', () => {
        const date = 1766080900000

        const result = formatDateAndTime(date)

        expect(result.day).toBe('Thu, Dec 18 2025')
        expect(result.time).toBe('06:01 PM')
    })
})