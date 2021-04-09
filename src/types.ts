
export interface User {
    email: string
    password: string
    avatar: any
    firstName: string
    lastName: string
    birthday: string
    id: number
}

export interface Event {
    date: string
    description: string
    user: User
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