const { Server } = require("socket.io");

const io = new Server(8800, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

let activeUsers = []

io.on("connection", (socket) => {
    //when connect
    console.log("A user connected")
    socket.on("new-user-add", newUserId => {
        if(!activeUsers.some((user) => user?.userId === newUserId)){
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        io.emit("get-users", activeUsers)
    })
    console.log(activeUsers)

    //send and get messages
    socket.on("send-message", (data) => {
        const {receiverId} = data
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log("Sending to: " + receiverId)

        if(user){
            io.to(user.socketId).emit("receive-message", data)
        }
    })

    //when disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected")
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        io.emit("get-users", activeUsers)
    })
})