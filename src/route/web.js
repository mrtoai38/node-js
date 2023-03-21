import express from "express";
import homeController from "../controller/homeController";


const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.post('/create-new-user', homeController.createUser);

    router.get('/detail/user/:id', homeController.getUserDetailPage);

    return app.use('/', router);
}

export default initWebRoute;