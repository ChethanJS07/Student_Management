import express, { response } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/studentlogin", (req, res) => {
  const sql = "SELECT * FROM student WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) {
          return res.json({
            loginStatus: false,
            Error: "Wrong Email or Password",
          });
        }
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "student", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
    }
  });
});

router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT s.id, s.name, s.email, s.regno, c.name as department 
    FROM student s 
    JOIN category c ON s.dept_id = c.id
    WHERE s.id = ?
  `;
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

router.post('/reset_password/:id/:token', (req, res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              UserModel.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})


export { router as StudentRouter };
