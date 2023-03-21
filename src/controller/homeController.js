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

module.exports = {
    getHomepage,
    getUserDetailPage,
    createUser
}