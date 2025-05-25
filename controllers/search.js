const express = require("express");
var route = express.Router();
const db = require("../db/db.js");

  route.get("/",async(req,res) => {
    const mobno = req.query.mobno;
    try {
      const { rows, rowCount } = await db.query(
        `SELECT lname,address1,address2,address3,area,pincode,state,discount,lgroup,lopbal,mobno,l_recno,lgrp_recno,panno,gstno,aadharno,memno FROM newledger 
      WHERE mobno LIKE lower('%' || $1 || '%') AND lgroup = $2`,[mobno,'CUSTOMER']
      );
      if(rowCount != 0){
        return res.status(200).json({
          status : "success",
          data : rows,
          count :rowCount, 
        });
      }else{
        return res.json({
            status : "failed",
            data : [],
            count : 0
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(403).json({
        status: "error failed",
        data: [],
        count: 0,
      });
    }
  });
  module.exports = route;