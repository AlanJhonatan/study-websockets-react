import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"

export function Messages() {
    const { messages } = useContext(ChatContext)

    return (
        <div className='container-messages'>
            {
                messages.map((message) => {
                    const hours = new Date(message.timestamp).getHours()
                    const minutes = new Date(message.timestamp).getMinutes()
                    
                    return (
                        (
                            <div key={message.timestamp}>
                                <strong>[{`${message.from} at ${hours}:${minutes}`}]</strong> {message.text}
                            </div>
                        )
                    )
                })
            }
        </div>
    )
}