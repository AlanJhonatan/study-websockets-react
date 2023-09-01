import { ChangeEvent, FormEvent, useContext, useState } from "react"

import { ChatContext } from "../context/ChatContext"
import '../styles/MessageInput.css'

export function MessageInput() {
    const { sendMessage, setTypingStatus } = useContext(ChatContext)
    const [newMessage, setNewMessage] = useState('')

    function onMessageInput(event: ChangeEvent<HTMLInputElement>) {
        const currentMessage = event.currentTarget.value
        setNewMessage(currentMessage)
        
        if(!currentMessage.length) {
            setTypingStatus(false)
            return 
        }
        
        setTypingStatus(true)
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        sendMessage(newMessage)
        setNewMessage('')
        setTypingStatus(false)
    }

    return (
        <form className='container-text-input' onSubmit={handleSubmit}>
          <input type="text" placeholder="Type an new message here..." onChange={onMessageInput} value={newMessage} />
          <button type="submit"></button>
        </form>
        
    )
}