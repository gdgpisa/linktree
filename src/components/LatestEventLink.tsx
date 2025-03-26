import { useEffect, useState } from 'preact/hooks'

import { Icon } from '@iconify/react'

type GDGComunityEvent = {
    title: string
    url: string
    cropped_picture_url: string
}

async function getLatestEvent(): Promise<GDGComunityEvent> {
    const res = await fetch(
        `https://gdg.community.dev/api/event_slim/for_chapter/854/?page_size=1&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=-start_date&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short&page=1`,
        {
            mode: 'cors',
        },
    )

    const data = await res.json()
    const { results } = data

    console.log('Latest Upcoming Event:', results[0])

    return results[0]
}

async function getLatestCompletedEvent(): Promise<GDGComunityEvent> {
    const res = await fetch(
        `https://gdg.community.dev/api/event_slim/for_chapter/854/?page_size=1&status=Completed&include_cohosted_events=true&visible_on_parent_chapter_only=true&order=-start_date&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short&page=1`,
        {
            mode: 'cors',
        },
    )

    const data = await res.json()
    const { results } = data

    console.log('Latest Completed Event:', results[0])

    return results[0]
}

const FEEDBACK_FORM_URL_PREFIX = `https://docs.google.com/forms/d/e/1FAIpQLSdPCraC4NxEaxKEcqUIE7llG3xbBZtHiQnlKPh3hVzHe1be7Q/viewform`

export const LatestEventLink = ({}) => {
    const [latestEvent, setLatestEvent] = useState<GDGComunityEvent | null>(null)
    const [latestCompletedEvent, setLatestCompletedEvent] = useState<GDGComunityEvent | null>(null)

    useEffect(() => {
        getLatestEvent().then(event => {
            setLatestEvent(event)
        })
        getLatestCompletedEvent().then(event => {
            setLatestCompletedEvent(event)
        })
    }, [])

    
    return (
        <>
            {latestEvent && (
                <div class="links">
                    <a class="card" href={latestEvent.url} target="_blank">
                        <div class="picture">
                            <img src={latestEvent.cropped_picture_url} alt="GDG Community Event" />
                        </div>
                    </a>
                    <a
                        href={
                            FEEDBACK_FORM_URL_PREFIX +
                            `?usp=pp_url&entry.1235423955=${
                                latestCompletedEvent ? encodeURIComponent(latestCompletedEvent.title) : ''
                            }`
                        }
                        class="large"
                    >
                        <Icon icon="material-symbols:rss-feed" />
                        <div class="fill center">Feedback from last event</div>
                    </a>
                </div>
            )}
        </>
    )
}
