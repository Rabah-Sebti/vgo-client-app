require("express-async-errors");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const errorHandlerMiddleware = require("./middleware/error-handler");
const authUser = require("./middleware/auth");
const port = 4000;
require("dotenv").config();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const coursesRoute = require("./routes/course");
const imagesRoute = require("./routes/images");

const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use("/api/auth", authRoute);
app.use("/api/users", authUser, userRoute);
app.use("/api/courses", authUser, coursesRoute);
app.use("/api/images", authUser, imagesRoute);


app.use(errorHandlerMiddleware);
const connectDB = require("./db/connect");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listenning at port ${port}`);
    });
  } catch (error) {
    console.log("connect error", error);
  }
};
start();
