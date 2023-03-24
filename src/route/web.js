import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from 'path';
var appRoot = require('app-root-path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('appRoot: >>  ' + appRoot);
        cb(null, appRoot + "/src/public/image/");
    },
    //by default, multer removes file extensions so let's add then back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('picture', 3);

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.post('/create-new-user', homeController.createUser);
    router.post('/delete-user', homeController.deleteUser);

    router.get('/detail/user/:id', homeController.getUserDetailPage);
    router.get('/edit-user/:id', homeController.getEditUser);
    router.post('/update-user', homeController.updateUser);
    router.get('/upload-file', homeController.uploadFile);
    router.post('/upload-single-file', upload.single('picture'), homeController.uploadSingleFile);
    router.post('/upload-mutiple-file', (req, res, next) => {
        uploadMultipleFiles(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                // handle multer file limit error here
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            } else {
                // make sure to call next() if all was well
                next();
            }
        })
    }, homeController.uploadMutipleFile);

    return app.use('/', router);
}

export default initWebRoute;