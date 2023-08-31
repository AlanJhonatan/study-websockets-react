import { ChangeEvent, FormEvent, useContext, useState } from "react"

import { ChatContext } from "../context/ChatContext"
import '../styles/MessageInput.css'

export function MessageInput() {
    const { sendMessage } = useContext(ChatContext)
    const [newMessage, setNewMessage] = useState('')

    function onMessageInput(event: ChangeEvent<HTMLInputElement>) {
        setNewMessage(event.currentTarget.value)
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        sendMessage(newMessage)
        setNewMessage('')
    }

    return (
        <form className='container-text-input' onSubmit={handleSubmit}>
          <input type="text" placeholder="Type an new message here..." onChange={onMessageInput} value={newMessage} />
          <button type="submit"></button>
        </form>
        
    )
}