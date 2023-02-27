import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./helpers/database/connectDB.js"
import cors from "cors";
import routers from "./routes/index.js";
import customErrorHandler from "./middlewares/errors/customErrorHandler.js";

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
