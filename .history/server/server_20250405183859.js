require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const authRoute = require("./routes/auth-route");
const contactRoute = require("./routes/contact-router");

const tractorRoutes = require("./routes/tractor-route");

const connectDb = require("./utils/db");
const errorMiddleware= require("./middlewares/error-middleware");

app.use(
  cors({
      origin: function (origin, callback) {
          if (!origin || origin.startsWith("http://localhost")) {
              callback(null, true); // Allow requests from any localhost port
          } else {
              callback(new Error("Not allowed by CORS"));
          }
      },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute );

app.use("/api/tracform",tractorRoutes);

app.use(errorMiddleware); 



const PORT = 5000;

connectDb().then(()=>{
app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
});