declare module '@/data.yaml' {
    const value: {
        social: {
            title: string
            icon: string
            url: string
            visible: boolean
        }[]
        sections: {
            title?: string
            links: {
                title: string
                icon: string
                url: string
                visible: boolean
                dataInizio?: string  // Ora è opzionale e di tipo string
                dataFine?: string    // Ora è opzionale e di tipo string
            }[]
        }[]
    }
    export default value
}