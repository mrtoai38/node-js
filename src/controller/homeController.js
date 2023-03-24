import pool from "../config/connectDB";
import multer from "multer";

let getHomepage = async(req, res) => {
    const [rows] = await pool.execute("SELECT * FROM users");

    return res.render('index.ejs', { dataUsers: rows });
}

let getUserDetailPage = async(req, res) => {
    const [rows] = await pool.execute("SELECT * FROM users where `id` = ? ", [req.params.id]);

    return res.render('userDetail.ejs', { data: JSON.stringify(rows) });
}

let createUser = async(req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute("insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)", [firstName, lastName, email, address]);
    return res.redirect('/');
}

let deleteUser = async(req, res) => {
    await pool.execute("delete from users where id = ?", [req.body.id])
    return res.redirect('/');
}

let getEditUser = async(req, res) => {
    const [user] = await pool.execute("SELECT * FROM users where `id` = ? ", [req.params.id]);
    return res.render('updateUser.ejs', { data: user[0] });
}

let updateUser = async(req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute("update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?", [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

let uploadFile = async(req, res) => {
    return res.render('uploadFile.ejs');
}

let uploadSingleFile = async(req, res) => {
    console.log("check >> ", req.file);
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    } else if (!req.file) {

        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="./upload-file">Upload another image</a>`);
}
let uploadMutipleFile = (req, res) => {
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    } else if (!req.files) {

        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./upload-file">Upload more images</a>';
    res.send(result);
}

module.exports = {
    getHomepage,
    getUserDetailPage,
    createUser,
    deleteUser,
    getEditUser,
    updateUser,
    uploadFile,
    uploadSingleFile,
    uploadMutipleFile
}