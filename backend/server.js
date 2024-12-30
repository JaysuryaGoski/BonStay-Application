import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import db from "./database/db.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api',router);

const port = process.env.PORT;

db();

app.listen(port,
    ()=>{
        console.log(`server started running on port : ${port}`);
    }
)
