const bcrypt = require("bcrypt");
const DB = require("../database");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const mysql = require("mysql");
const { check, validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  const { name, phonenumber, email, password, typeoforg } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const sqlSearch = `SELECT * FROM users WHERE LOWER(email)= LOWER(${DB.escape(
    email
  )})`;
  const search_query = mysql.format(sqlSearch, [email]);
  try {
    DB.query(search_query, async (err, result) => {
      if (err) {
        return res.status(403).json({ message: "something went wrong" });
      } else if (result.length != 0) {
        return res.status(400).json({ message: "please try with valid email" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const queryString =
          "INSERT INTO users (name,phonenumber,email,password,typeoforg) VALUES (?,?,?,?,?)";
        DB.query(
          queryString,
          [name, phonenumber, email, hashPassword, typeoforg],
          (err, results, feilds) => {
            if (err) {
              return res.status(400).json({ error: err });
            }
            return res.status(200).json({ user: results, feilds });
          }
        );
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const sqlSearch = `SELECT * FROM users WHERE email= ${DB.escape( email)};`
  const search_query = mysql.format(sqlSearch, [email]);
  try {
     DB.query(search_query, async (err, result) => {
      // console.log(result);
      if (err) {
        return res.status(403).json({ message: "something went wrong" });
      }
      if (!result.length) { 
        return res.status(401).send({
          message: "Email or password is incorrect!",
        });
      }
        const DBpassword = result[0]["password"];
        const isMatch = await bcrypt.compare(password, DBpassword);
        if (isMatch) {
          const token = jwt.sign({ _id: result[0].user_id }, process.env.SECRET);
          //put token in cookie
          res.cookie("token", token, { expire: new Date() + 9999 });
          //send response to front end
          const { user_id, name, email } = result[0];
          return res.json({ token, user: { user_id, name, email } });
        }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};
