import { ReactNode, useCallback, useEffect, useState } from "react"
import { socket } from "../api/socket"
import { ChatContext, ProfileData } from "./ChatContext"

interface ChatContextProviderProps {
    children: ReactNode
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
    const [user, setUser] = useState<string>('')
    const [isLoginEnabled, setIsLoginEnabled] = useState<boolean>(true)
    const [profiles, setProfiles] = useState<ProfileData[]>([])

    const doLogin = useCallback(
        (name: string) => {
            setIsLoginEnabled(false)
            setUser(name)

            const currentProfile = { id: crypto.randomUUID(), user: name }
            
            socket.connect()
            socket.emit('login', currentProfile)
            // console.log('logged as:', name)
        },
        []
    )

    useEffect(() => {
        console.log('context useEffect')
        
        socket.on('intialProfiles', (initialProfiles: ProfileData[]) => {
            setProfiles(initialProfiles)
            console.log('initialProfiles', initialProfiles);
        })
        
        socket.on("addProfile", (profile: ProfileData) => {
            setProfiles(prevState => ([...prevState, profile]))
            console.log('adding...', profile)
        })

        // socket.on("updateProfiles", (profiles: ProfileData[]) => {
        //     setProfiles(profiles)
        // })

        return () => {
            socket.disconnect()
        }
    }, [])

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