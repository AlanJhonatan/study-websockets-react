import { ChangeEvent, useState } from "react"

export function MessageInput() {

    const [newMessage, setNewMessage] = useState('')

    function onMessageInput(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewMessage(event.currentTarget.value)
    }

    return (
        <div className='container-text-input'>
          <textarea onChange={onMessageInput} value={newMessage}/>

          {newMessage}
        </div>
        
    )
}