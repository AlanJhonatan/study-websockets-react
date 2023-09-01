export interface IProfile {
    id: string
    name: string
    typing?: boolean
}

export interface SocketMessage {
    from: string
    text: string
    timestamp: string
}