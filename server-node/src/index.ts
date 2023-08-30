import { Server } from "socket.io"
import { IProfile } from "./Types"

const io = new Server(3000, {
    cors: {
        origin: '*'
    }
})

type SocketProfile = IProfile & { socketId: string }

let socketProfiles: SocketProfile[] = []

function listProfiles(profiles: SocketProfile[]) {
    return profiles.map(profile => ({
        id: profile.id,
        user: profile.user
    }))
}

io.on("connection", (socket) => {
    socket.emit('initialProfiles', listProfiles(socketProfiles))
    
    socket.on("login", (data: IProfile) => {
        const currentSocket = {
            socketId: socket.id,
            ...data,
        }

        socketProfiles.push(currentSocket)
        socket.emit('addProfile', data)

        console.log('login', socketProfiles)
    })

    socket.on("disconnect", () => {
        socketProfiles = socketProfiles.filter(socketProfile => socket.id !== socketProfile.socketId)

        socket.emit("updateProfiles", listProfiles(socketProfiles))
        console.log('onDisconnect', socketProfiles)
    })
})




io.listen(4000)