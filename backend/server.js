const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { chats } = require("./data/data");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const app = express();
app.use(express.json()); //to accept json data
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(errorHandler);
app.use(notFound);
connectDb();
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`server started on http://localhost:${Port}`);
});

//https://api.cloudinary.com/v1_1/djb29iuoj
