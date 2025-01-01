import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import db from "./database/db.js"
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());


app.use(express.json());

app.use('/api',router);

const port = process.env.PORT;

db();

app.listen(port,
    ()=>{
        console.log(`server started running on port : ${port}`);
    }
)
