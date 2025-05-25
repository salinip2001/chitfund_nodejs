const express = require("express");
var route = express.Router();
const db = require("../db/db.js");

route.get("/",async(req,res) =>{
  const g_name = req.query.g_name;
    try{
      const{rows,rowCount} = await db.query(`SELECT g_recno,g_name,g_installment,g_minvalue,g_maxvalue FROM groupsetup WHERE g_name = $1`,[g_name]);
  
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
  // get All groupData
  route.get("/alldata",async(req,res) =>{
      try{
        const{rows,rowCount} = await db.query(`SELECT g_recno,g_name,g_installment,g_minvalue,g_maxvalue FROM groupsetup `,null);
    
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