import express from "express";
import homeController from "../controller/homeController";


const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.post('/create-new-user', homeController.createUser);
    router.post('/delete-user', homeController.deleteUser);

    router.get('/detail/user/:id', homeController.getUserDetailPage);
    router.get('/edit-user/:id', homeController.getEditUser);
    router.post('/update-user', homeController.updateUser);

    return app.use('/', router);
}

export default initWebRoute;