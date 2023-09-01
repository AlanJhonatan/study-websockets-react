import { Server } from "socket.io"
import { IProfile, SocketMessage } from "./Types"

const io = new Server(3000, {
    cors: {
        origin: '*'
    }
})

type SocketProfile = IProfile

let socketProfiles: SocketProfile[] = []
let socketMessages: SocketMessage[] = []

io.on("connection", (socket) => {
    console.log('new connection:', socket.id)
    
    socket.on("login", ({ name }) => {
        const profile = {
            id: socket.id,
            name,
        }

        socketProfiles.push(profile)
        socket.emit('doLogin', profile)
        socket.emit('initialProfiles', socketProfiles)
        socket.emit('initialMessages', socketMessages)
        
        socket.broadcast.emit('addProfile', profile)
    })

    socket.on('sendMessage', (message: SocketMessage) => {
        socketMessages.push(message)

        console.log('new message: ', message)
        socket.broadcast.emit('receiveMessage', message)
    })

    socket.on('profileTyping', (data: { socketId: string, status: boolean }) => {
        const profileIndex = socketProfiles.findIndex(profile => profile.id === data.socketId)
        
        if(profileIndex < 0) {
            return
        }

        socketProfiles[profileIndex] = {
            ...socketProfiles[profileIndex],
            typing: data.status,
        }

        console.log(socketProfiles)

        const typingProfiles = socketProfiles
            .filter(profile => profile.typing)
            .map(profile => profile.name)

        socket.broadcast.emit('updateProfilesTyping', typingProfiles)
        
        console.log('typing profiles:', typingProfiles)
    })

    socket.on("disconnect", () => {
        socketProfiles = socketProfiles.filter(socketProfile => socket.id !== socketProfile.id)

        socket.broadcast.emit("disconnectProfile", socket.id)
    })
})

io.listen(4000)
console.log('listening at 4000 (locally)')