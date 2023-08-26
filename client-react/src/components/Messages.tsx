import { useEffect, useState } from "react"


export function Messages() {
    const messagesMock = [{
            id: crypto.randomUUID(),
            text: "some random message 1",
            profile: "Alan Jhonatan",
            createdAt: new Date(),
    }]
    

    const [messages, setMessages] = useState([...messagesMock])

    function addMessage() {
        const newMessage = {
            id: crypto.randomUUID(),
            text: "some random message " + new Date(),
            profile: "Munique Mello",
            createdAt: new Date(),
        }

        setMessages([...messages, newMessage])
    }

    useEffect(() => {
        addMessage()
    }, [])

    return (
        <div className='container-messages'>
            {
                messages.map((message) => (
                    <div key={message.id}>
                        <strong>[{message.profile}]</strong> {message.text}
                    </div>
                ))
            }
        </div>
    )
}