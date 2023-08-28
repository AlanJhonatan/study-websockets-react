import { ReactNode, createContext, useCallback, useState } from "react";

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

interface ChatContextProviderProps {
    children: ReactNode
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
    const [user, setUser] = useState<string>('')
    const [isLoginEnabled, setIsLoginEnabled] = useState<boolean>(true)
    const [profiles, setProfiles] = useState<ProfileData[]>([])

    // function doLogin(name: string) {
    //     setIsLoginEnabled(false)
    //     setUser(name)
    // }

    const doLogin = useCallback(
        (name: string) => {
            setIsLoginEnabled(false)
            setUser(name)
            setProfiles([...profiles, {
                id: crypto.randomUUID(),
                user: name,
            }])
            console.log('logged as:', name)
        },
        []
    )

    // const addProfile = useCallback(
    //     (data: ProfileData) => {
    //         setProfiles([...profiles, data])
    //     }, []
    //     )

    return (
        <ChatContext.Provider value={{
            user,
            profiles,
            isLoginEnabled,
            doLogin,
            // addProfile
        }}>
            {children}
        </ChatContext.Provider>
    )
}