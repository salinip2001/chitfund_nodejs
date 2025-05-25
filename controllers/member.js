const express = require("express");
var route = express.Router();
const db = require("../db/db.js");

route.get("/",async(req,res) =>{
  try{
    const{rows,rowCount} = await db.query(`SELECT m_recno,m_name,m_no,m_mobno,m_adr1,m_adr2,m_adr3,m_discount FROM members ORDER BY m_recno`,null);

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