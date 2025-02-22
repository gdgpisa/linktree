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
                dataInizio?: string  // Ora è opzionale e di tipo string es: 2025-02-22T19:56:00 fuso orario Londra - va messa un ora indietro
                dataFine?: string    // Ora è opzionale e di tipo string es: 2025-02-22T19:56:00 fuso orario Londra - va messa un ora indietro
            }[]
        }[]
    }
    export default value
}