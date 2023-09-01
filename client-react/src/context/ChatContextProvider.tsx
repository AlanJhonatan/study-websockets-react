import { ReactNode, useCallback, useEffect, useState } from "react"
import { socket } from "../api/socket"
import { ChatContext, MessageData, ProfileData } from "./ChatContext"

interface ChatContextProviderProps {
    children: ReactNode
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
    const [user, setUser] = useState<string>('')
    const [socketId, setSocketId] = useState<string>('')
    const [messages, setMessages] = useState<MessageData[]>([])
    const [profilesTyping, setProfilesTyping] = useState<string[]>([])
    
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

    const setTypingStatus = useCallback((status: boolean) => {
        socket.emit('profileTyping', { socketId, status })
        console.log('typing:', { socketId, status })
    }, [socketId])

    useEffect(() => {
        socket.on('doLogin', (profile: { id: string, name: string }) => {
            setSocketId(profile.id)
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

        socket.on("updateProfilesTyping", (profilesTyping: string[]) => {
            setProfilesTyping(profilesTyping)
            console.log('someone is typing...', profilesTyping)
        })

        return () => {
            socket.off('addProfile')
            socket.off('initialProfiles')
            socket.off('initialMessages')
            socket.off('disconnectProfile')
            socket.off('receiveMessage')
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
            profilesTyping,
            doLogin,
            sendMessage,
            setTypingStatus,
        }}>
            {children}
        </ChatContext.Provider>
    )
}