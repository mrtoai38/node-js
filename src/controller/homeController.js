import pool from "../config/connectDB";

let getHomepage = async(req, res) => {
    const [rows] = await pool.execute("SELECT * FROM users");

    return res.render('index.ejs', { dataUsers: rows });
}

module.exports = {
    getHomepage
}