require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));


const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});