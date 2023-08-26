import { useState } from "react"

export function Profiles() {
    const [profiles, setProfiles] = useState([
        {
            id: crypto.randomUUID(),
            name: "Alan Jhonatan",
        },
        {
            id: crypto.randomUUID(),
            name: "Munique Mello",
        }
    ])


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