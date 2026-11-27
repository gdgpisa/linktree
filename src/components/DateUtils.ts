export const isDateTimeInRange = (startDateTime?: string, endDateTime?: string): boolean => {
    // Se le date non sono definite, il link è sempre visibile
    if (!startDateTime || !endDateTime) {
        return true
    }
    const now = new Date()
    const start = new Date(startDateTime)
    const end = new Date(endDateTime)
    return now >= start && now <= end
}

export const formatItalianDateTime = (dateStr: string): string => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('it-IT', {
        timeZone: 'Europe/Rome',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date)
}

// Calendar day of a date in Italy, as "YYYY-MM-DD" (the en-CA locale uses this format).
// Two such strings can be compared with < and > to tell which day comes first.
export const toRomeCalendarDay = (date: Date): string =>
    new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Rome',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date)
