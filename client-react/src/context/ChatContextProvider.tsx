import { ReactNode, useCallback, useEffect, useState } from "react"
import { socket } from "../api/socket"
import { ChatContext, MessageData, ProfileData } from "./ChatContext"

interface ChatContextProviderProps {
    children: ReactNode
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
    const [user, setUser] = useState<string>('')
    const [messages, setMessages] = useState<MessageData[]>([])
    const [isLoginEnabled, setIsLoginEnabled] = useState<boolean>(true)
    const [profiles, setProfiles] = useState<ProfileData[]>([])

    const doLogin = useCallback(
        (name: string) => {
            setIsLoginEnabled(false)
            setUser(name)
            socket.connect()
            socket.emit('login', { name })
        },
        []
    )

    const sendMessage = useCallback(
        (text: string) => {
            const message: MessageData = {
                from: user,
                timestamp: new Date().toString(),
                text,
            }
            socket.emit('sendMessage', message)
            setMessages(prevState => [...prevState, message])
            console.log('sending message:', message)
        },
        [user]
    )

    useEffect(() => {
        socket.on('doLogin', (profile: { id: string, name: string }) => {
            console.log('login done as:', user, profile)
        })

        socket.on('initialProfiles', (initialProfiles: ProfileData[]) => {
            setProfiles(initialProfiles)
            console.log('initialProfiles', initialProfiles);
        })

        socket.on('initialMessages', (messages: MessageData[]) => {
            setMessages(messages)
            console.log('initialMessages', messages)
        })

        socket.on('receiveMessage', (message: MessageData) => {
            setMessages(prevState => [...prevState, message])
            console.log('receiveMessage', message)
        })
        
        socket.on("addProfile", (profile: ProfileData) => {
            setProfiles(prevState => ([...prevState, profile]))
            console.log('adding profile:', profile)
        })

        socket.on("disconnectProfile", (profileId: string) => {
            setProfiles(prevState => prevState.filter(profile => profile.id !== profileId))
        })

        // socket.on("updateProfiles", (profiles: ProfileData[]) => {
        //     setProfiles(profiles)
        // })

        return () => {
            socket.off('addProfile')
            socket.off('initialProfiles')
            socket.off('initialMessages')
            socket.off('disconnectProfile')
            // some cleanup functions
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
            messages,
            isLoginEnabled,
            doLogin,
            sendMessage,
            // addProfile
        }}>
            {children}
        </ChatContext.Provider>
    )
}