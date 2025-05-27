import express, { Express } from "express";
import mongoose from "mongoose";
import  "dotenv/config";
import cors from "cors";
import financialRecordRoute from "./routes/financialRecordRoute";

const app: Express = express();

const port = 7000;

app.use(express.json());
app.use(cors());


const mongoDB = process.env.MONGODB_URI as string;

mongoose.connect(mongoDB)
   .then(() => console.log("Connected to database!"))
   .catch((err) => (console.error("Failed to connect to database!", err)));

app.use("/financialRecords", financialRecordRoute);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
