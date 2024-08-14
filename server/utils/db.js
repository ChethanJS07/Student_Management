import mysql from "mysql2";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chethan//07",
  database: "students",
});

con.connect(function (err) {
  if (err) {
    console.error("Connection Error: ", err.message);
  } else {
    console.log("DB Connected");
  }
});

export default con;
