import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"

export function Profiles() {
    const { profiles } = useContext(ChatContext)

    return (
        <div className='container-profiles'>
            {
                profiles.map((profile) => {
                    return (
                        <div key={profile.id}>
                            {profile.name}
                        </div>
                    )
                })
            }
        </div>
    )
}