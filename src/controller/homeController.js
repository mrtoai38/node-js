import pool from "../config/connectDB";

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
module.exports = {
    getHomepage,
    getUserDetailPage,
    createUser,
    deleteUser,
    getEditUser,
    updateUser
}