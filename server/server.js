const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const conncetDb = require("./config/db");
const postRoutes = require("./routes/postRoutes");

dotenv.config();
conncetDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
