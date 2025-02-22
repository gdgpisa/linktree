import { useEffect } from 'preact/hooks'
import data from '@/data.yaml'

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

const DateUtils = () => {
    useEffect(() => {
        console.log('✅ DateUtils caricato lato client')

        data.sections.forEach(section => {
            section.links.forEach(link => {
                const isVisible = isDateTimeInRange(link.dataInizio, link.dataFine)
                // console.log(`🔗 ${link.title}`)
                // console.log(`📅 Inizio: ${link.dataInizio || 'N/A'}`)
                // console.log(`📅 Fine: ${link.dataFine || 'N/A'}`)
                // console.log(`👀 Visibile: ${isVisible}`)
            })
        })
    }, [])

    return null // Nessun rendering, è solo per logica
}

export default DateUtils
