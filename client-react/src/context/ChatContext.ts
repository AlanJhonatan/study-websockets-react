import { createContext } from "react";

export interface ProfileData {
    id: string
    user: string
}

interface ChatContextType {
    user: string
    profiles: ProfileData[]
    isLoginEnabled: boolean
    doLogin: (name: string) => void
}

export const ChatContext = createContext({} as ChatContextType)
