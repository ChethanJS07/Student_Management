import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
    }
  });
});

router.get("/department", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/addDepartment", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

router.post("/addStudent", (req, res) => {
  const sql = `INSERT INTO student 
    (name,email,password, regno,dept_id) 
    VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.regno,
      req.body.dept_id,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
    });
  });
});

router.get("/student", (req, res) => {
  const sql = `
    SELECT s.id, s.name, s.email, s.regno, c.name as department 
    FROM student s 
    JOIN category c ON s.dept_id = c.id
  `;

  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/student/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT s.id, s.name, s.email, s.regno, c.name as department 
    FROM student s 
    JOIN category c ON s.dept_id = c.id
    WHERE s.id = ?
  `;

  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.put("/editStudent/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE student SET name= ?, email= ?, regno= ?, dept_id= ? WHERE id= ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.regno,
    req.body.dept_id,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error"+err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/adminCount',(req,res) => {
  const sql = 'SELECT count(id) AS admin FROM admin';
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error"+err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/studentCount',(req,res) => {
  const sql = 'SELECT count(id) AS student FROM student';
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error"+err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/deptCount',(req,res) => {
  const sql = 'SELECT count(id) AS department FROM category';
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error"+err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get('/adminRecords', (req,res) => {
  const sql = 'SELECT * FROM admin';
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error"+err });
    }
    return res.json({ Status: true, Result: result });
  });
})

router.get('/logout',(req,res) => {
  res.clearCookie('token');
  return res.json({Status: true})
})

export { router as adminRouter };
