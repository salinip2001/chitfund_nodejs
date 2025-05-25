const express = require("express");
var route = express.Router();
const db = require("../db/db.js");

route.get("/",async(req,res) => {
  try{
   const{rows,rowCount} = await db.query(`SELECT lname,address1,address2,address3,area,pincode,state,phoneno,lgroup,lopbal,mobno,email,l_recno,lgrp_recno,memno FROM NEWLEDGER WHERE lgroup = 'CUSTOMER'`,null);

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
  }catch(error){
    return res.status(403).json({
        status: "error failed",
        data: [],
        count: 0,
      });
  }

});
// get ledgerrecno 
route.get("/customerrecno",async(req,res)=>{
  const l_recno = req.query.l_recno;
  try{
    const{rows,rowCount} = await db.query(`SELECT lname,address1,address2,address3,area,pincode,state,phoneno,lgroup,lopbal,mobno,email,l_recno,lgrp_recno,memno FROM NEWLEDGER WHERE lgroup = 'CUSTOMER'AND l_recno = $1`,[l_recno]);

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
  }catch(error){
    return res.status(403).json({
      status: "error failed",
      data: [],
      count: 0,
    });

  }

});
module.exports = route;