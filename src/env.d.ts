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
                // Optional visibility window, e.g. 2025-02-22T19:56:00. Interpreted with London offset:
                // enter the time one hour behind the intended Europe/Rome time.
                dataInizio?: string
                dataFine?: string
            }[]
        }[]
    }
    export default value
}
