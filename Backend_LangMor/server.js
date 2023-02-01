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
require("./models/User")


//Setup Server
const PORT = 8000;
const app = require("./app");
app.use(require("cors")()); // Don't know why I use this

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
