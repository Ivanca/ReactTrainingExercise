
export interface Event {
    date: string
    description: string
    host: number
    tags: string
    type: 'public' | 'private'
    id: number
    location: string
    name: string
}

export interface FavData {
    id: number,
    userId: number,
    eventId: number
}