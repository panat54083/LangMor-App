require("dotenv").config();

//Setup Mongoose
const mongoose = require("mongoose");
//mongoose conected to Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
});
//Check if fail to connect
mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection Error: " + err.message);
});
//Check if success to connect
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
});

//Setup Models
require("./models/Customer");
require("./models/Merchant");
require("./models/Restaurant");
require("./models/Option");
require("./models/Food");
require("./models/Chatroom");
require("./models/Message");

//Setup Server
const PORT = 8000;
const app = require("./app");
app.use(require("cors")()); // Don't know why I use this

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Setup Socket
const io = require("socket.io")(server, {
    cors: {
        origin: true,
    },
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = require("jsonwebtoken").verify(
            token,
            process.env.SECRET
        );
        socket.userId = payload.id;
        next();
    } catch (err) {
        console.error(err);
    }
});

io.on("connection", (socket) => {
    console.log(`🟢: Socket connected! [${socket.id}]`);

    socket.on("disconnect", () => {
        socket.disconnect();
        console.log(`🔴: Socket disconnected! [${socket.id}]`);
    });

    socket.on("joinRoom", ({ chatroom }) => {
        socket.join(chatroom);
        console.log(`${socket.userId} joined ${chatroom} ID`);
    });

    socket.on("leaveRoom", ({ chatroom }) => {
        socket.leave(chatroom);
        console.log(`${socket.userId} left ${chatroom} ID`);
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
        if (message.trim().length > 0) {
            console.log(message);
        }
    });
});
