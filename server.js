import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views",  "views")


const db = mysql.createConnection({
    host: "localhost",
    database: "ikariedb",
    user: "root",
    password: "",
})

db.connect((err) => {
    if(err) throw err
    console.log("database terkoneksi");
});

 //ambil data dari db dan menampilkan di html
 app.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
    const users = JSON.parse(JSON.stringify(result))
    res.render("index", {users: users, title : "belajar express"});
})
    
});



 //insert data
 app.post("/tambah", (req,res) => {
    const insertsql = `INSERT INTO user (id_user, namalengkap) VALUES ('', '${req.body.namalengkap}');`
    db.query(insertsql, (err, result) => {
        if(err) throw err
        res.redirect("/")
    })
});










app.listen(8000, () => {
    console.log("ini udah jalan");
});