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
    profilesTyping: string[]
    doLogin: (name: string) => void
    sendMessage: (text: string) => void
    setTypingStatus: (status: boolean) => void
}

export const ChatContext = createContext({} as ChatContextType)
