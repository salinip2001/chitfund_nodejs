const express = require("express");
var route = express.Router();
const db = require("../db/db.js");

// INSERT AGENT RECORDS
route.get("/",async(req,res) => {
  const username = req.query.username;
  const userpassword = req.query.userpassword;
  console.log(username);
  console.log(userpassword);

  try{
    const{rows,rowCount} = await db.query(`SELECT * FROM USERMASTER WHERE TRIM(username) = $1 AND TRIM(userpassword) = $2`,[username,userpassword]);
    if (rowCount != 0) {
      return res.status(200).json({
        status: "success",
        data: rows,
        count: rowCount,
      });
    } else {
      return res.json({
        errors:{
        status: "failed",
        data: [],
        count: 0,
        }
      });
    }

  }catch(error){
    return res.status(403).json({
      errors: {
      status: "failed",
      data: [],
      count: 0,
      }
    });
  }
});
  module.exports = route;
