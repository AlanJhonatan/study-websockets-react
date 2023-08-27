import { useState } from "react"

interface Profile {
    id: string,
    name: string
}

export function Profiles() {
    const profileMock = [
        {
            id: crypto.randomUUID(),
            name: "Alan Jhonatan",
        },
        {
            id: crypto.randomUUID(),
            name: "Munique Mello",
        }
    ]

    const [profiles, _] = useState<Profile[]>(profileMock)

    // function addProfile(data: Profile) {
    //     setProfiles(current => ([...current, data]))
    // }

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