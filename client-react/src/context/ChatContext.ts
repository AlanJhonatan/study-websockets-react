import { createContext } from "react";

export interface ProfileData {
    id: string
    name: string
}

export interface MessageData {
    from: string
    text: string
    timestamp: string
}

interface ChatContextType {
    user: string
    isLoginEnabled: boolean
    profiles: ProfileData[]
    messages: MessageData[]
    doLogin: (name: string) => void
    sendMessage: (text: string) => void
}

export const ChatContext = createContext({} as ChatContextType)
