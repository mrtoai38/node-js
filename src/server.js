import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connection from './config/connectDB';

var morgan = require('morgan');
const app = express();




const port = process.env.PORT;
app.use(morgan('combined'))

//body paser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up view engine
configViewEngine(app);


//init web route
initWebRoute(app);

//init API route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    res.render('404.ejs');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})