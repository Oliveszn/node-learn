require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const bookRoutes = require("./routes/BookRoutes");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
//connect to db
connectToDB();

//routes
app.use("/api/books", bookRoutes);

app.listen(PORT, () => console.log(`server on ports ${PORT}`));
