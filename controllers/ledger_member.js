const express = require("express");
var route = express.Router();
const db = require("../db/db.js");

// INSERT MEMBERS
route.get("/",async(req,res) => {
    const mobno = req.query.mobno;
   
    try{
      const{rows,rowCount} = await db.query(`SELECT * FROM newledger WHERE lgroup = 'CUSTOMER' AND mobno = $1`,[mobno]);
      if(rowCount != 0){
        return res.status(200).json({
          status : "success",
          data : rows,
          count :rowCount, 
        });
      }else{
        const m_recno = req.body.m_recno;
        const m_name = req.body.m_name;
        const m_no = req.body.m_no;
        const m_adr1 = req.body.m_adr1;
        const m_adr2 = req.body.m_adr2;
        const m_adr3 = req.body.m_adr3;
        const maintable = await db.query(`INSERT INTO members(m_recno,m_name,m_no,m_mobno,m_adr1,m_adr2,m_adr3,m_randomid)VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          m_recno,
          m_name,
          m_no,
          mobno,
          m_adr1,
          m_adr2,
          m_adr3,
          makeid(15)
        ]);
        return res.json({
          status : "Sorry please add the member details",
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

function makeid(length) {
  let result = "";
  const characters =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
module.exports = route;