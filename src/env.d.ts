declare module '@/data.yaml' {
    const value: {
        social: {
            title: string
            icon: string
            url: string
        }[]
        sections: {
            title?: string
            links: {
                title: string
                icon: string
                url: string
            }[]
        }[]
    }
    export default value
}
