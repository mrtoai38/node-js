import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";

const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/detail/user/:id', userController.getUserDetailPage);

    return app.use('/', router);
}

export default initWebRoute;