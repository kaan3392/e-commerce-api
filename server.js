const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routers = require("./routes");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const connectDatabase=require("./helpers/database/connectDB")

const app = express();

dotenv.config();

//MongoDB connection
connectDatabase()

app.use(express.json());

const corsOptions ={
  origin:'https://e-commerce-frontend-three.vercel.app', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));

//Router
app.use("/api", routers)


//Error Handler
app.use(customErrorHandler);


app.listen(process.env.PORT ||8800, () => {
  console.log("Backend server is ready!");
});
