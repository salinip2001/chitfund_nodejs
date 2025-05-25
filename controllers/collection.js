const express = require("express");
var route = express.Router();
const db = require("../db/db.js");

route.get("/",async(req,res) =>{
  const c_ledrecno = req.query.c_ledrecno;
  try{
    const{rows,rowCount} = await db.query(`SELECT c_recno,c_pfx,c_no,c_date,c_salesrep,c_amount,c_type,adjamount,c_depositeddate,c_ledrecno,c_grouptype FROM COLLECTION WHERE c_ledrecno = $1`,[c_ledrecno]);

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

route.post("/insert-collection",async(req,res) => {
  try{
    const c_recno = req.body.c_recno;
    const c_pfx = req.body.c_pfx;
    const c_no = req.body.c_no;
    const c_date = req.body.c_date;
    const c_time = req.body.c_time;
    const c_amount = req.body.c_amount;
    const c_type = req.body.c_type;
    const adjamount = req.body.adjamount;
    const c_ledrecno = req.body.c_ledrecno;
    const c_grouptype = req.body.c_grouptype;
    

    console.log(c_recno);
    console.log(c_pfx);
    console.log(c_no);
    console.log(c_date);
    console.log(c_amount);
    console.log(c_type);
    console.log(adjamount);
    console.log(c_ledrecno);
    console.log(c_grouptype);
    console.log(c_time);

     // collection Recno
     const collectionRecno = await db.query(
      `SELECT MAX(c_recno) as c_recno FROM collection`,
      null
    ); 
   // collection No
     const collectionNo = await db.query(`SELECT Max(c_no) as c_no FROM collection`,null);

    const { rows, rowCount } = await db.query(
      `INSERT INTO Collection(c_recno,c_pfx,c_no,c_date,c_amount,c_type,adjamount,c_ledrecno,c_grouptype,c_time,c_update,finyear,c_updatedbr,c_branchcode,branchid,c_mode,c_salesrep) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [
        collectionRecno["rows"][0]["c_recno"] + 1,
        c_pfx,
        collectionNo["rows"][0]["c_no"] +1,
        c_date,
        c_amount,
        c_type,
        adjamount,
        c_ledrecno,
        c_grouptype,
        c_time,
        'N',
        '2324',
        'SHP',
        'SHP',
        'WAHO',
        0,
        'SHOP'
      ]
    );

    if (rowCount != 0) {
      return res.status(200).json({
        status: "Insert Successfully",
      });
    } else {
      return res.json({
        status: "failed",
      });
    }


  }catch(error){
    console.log(error);
    var senddata = {
      status: "Insert Failed",
    };
  }
});
module.exports = route;