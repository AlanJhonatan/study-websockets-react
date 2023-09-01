import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"

export function TypeIndicator() {
    const { profilesTyping } = useContext(ChatContext)

    let complementaryText = <></>
    if(!profilesTyping.length) {
        return <></>
    } else if(profilesTyping.length === 1) {
        complementaryText = <> está digitando...</>
    } else {
        complementaryText = <> estão digitando...</>
    }
    
    return (
        <div>

            {
                !!profilesTyping.length && profilesTyping.map(name => {
                    return (
                        <strong key={name}>{name}</strong>
                    )
                })
            }

            {complementaryText}
        </div>
    )
}