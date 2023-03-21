import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from './route/web';

const app = express();
const port = process.env.PORT;

configViewEngine(app);

initWebRoute(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})