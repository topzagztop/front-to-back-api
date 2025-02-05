// Import lib
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/not-found");

//Import Routes
const authRoutes = require("./routes/auth-routes");

const app = express();

app.use(express.json()); // For read json
app.use(cors()); // Allows cross domain
app.use(morgan("dev")); // Show log terminal

//Routes
app.use("/api", authRoutes);

//error
app.use(errorHandler);
// app.use(notFound);

app.listen("8080", () => console.log("Server is running on port 8080"));
