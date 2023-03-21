import pool from "../config/connectDB";



let getUserDetailPage = async(req, res) => {
    const [rows] = await pool.execute("SELECT * FROM users where `id` = ? ", [req.params.id]);

    return res.render('userDetail.ejs', { data: JSON.stringify(rows) });
}

module.exports = {
    getUserDetailPage
}