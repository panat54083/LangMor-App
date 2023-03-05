const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup routes
app.use("/customer", require("./routes/customer"));
app.use("/merchant", require("./routes/merchant"));
app.use("/restaurant", require("./routes/restaurant"));
app.use("/chatroom", require("./routes/chatroom"));
app.use("/order", require("./routes/order"));
app.use("/secondHand", require("./routes/secondHand"))
app.use("/lostItem", require("./routes/lostItem"))

//Setup Error handlers
const errorHandlers = require("./handler/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV == "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

module.exports = app;
