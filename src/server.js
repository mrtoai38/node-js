import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from './route/web';
// import connection from './config/connectDB';

const app = express();
const port = process.env.PORT;


//body paser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up view engine
configViewEngine(app);


//init web route
initWebRoute(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})