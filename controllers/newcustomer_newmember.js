const express = require("express");
var route = express.Router();
const db = require("../db/db.js");

// insert newledger
route.post("/insert-newledger",async(req,res) => {
    try{
     const lname = req.body.lname;
     const address1 = req.body.address1;
     const address2 = req.body.address2;
     const address3 = req.body.address3;
     const area = req.body.area;
     const mobno = req.body.mobno;
     const l_recno = req.body.l_recno;
     const branchcode = req.body.branchcode;
     const m_name = req.body.m_name;
     const m_no = req.body.m_no;
     const m_mobno = req.body.m_mobno;
     const m_adr1 = req.body.m_adr1;
     const m_adr2 = req.body.m_adr2;
     const m_adr3 = req.body.m_adr3;
     const m_branchcode = req.body.m_branchcode;


     console.log(lname);
     console.log(address1);
     console.log(address2);
     console.log(address3);
     console.log(area);
     console.log(mobno);
     console.log(l_recno);
     console.log(branchcode);
     console.log(m_name);
     console.log(m_no);
     console.log(m_mobno);
     console.log(m_adr1);
     console.log(m_adr2);
     console.log(m_adr3);
     console.log(m_branchcode);
    
 // ledger recno as l_recno
     const maxRecno = await db.query(
        `SELECT MAX(l_recno) as l_recno FROM newledger`,
        null

      );
     const branch = await db.query(`SELECT branchcode FROM branchmaster`,null);
      
     let randomId = makeid(15); 
 // member recno as m_recno      
    const maxMemberrecno = await db.query(`SELECT MAX(m_recno) as m_recno FROM members`,null);   
 // ledger memno as memno  
   const ledgerMemno = await db.query(
        `SELECT MAX(genmemno) as memno FROM newledger`,
        null
      );
   const branchRecno = await db.query(`SELECT br_recno FROM branchmaster`,null);   
// member m_no as m_no
  const memberno = await db.query(`SELECT MAX(m_no) as m_no FROM members`,null);
  
  const{rows,rowCount} = await db.query(`SELECT * from members where m_mobno = $1`,[m_mobno]);
   
  if(rowCount == 0){
     maintable = await db.query(`INSERT INTO NEWLEDGER(lname,lgroup,address1,address2,address3,area,mobno,l_recno,memno,branchcode,randomid) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
     [
      lname,
      "CUSTOMER",
      address1,
      address2,
      address3,
      area,
      mobno,
      maxRecno["rows"][0]["l_recno"] + 1,
      `${ledgerMemno['rows'][0]['memno']+1}${branchRecno['rows'][0]['br_recno']}`,
      'SHP',
      `${randomId}${branch['rows'][0]['branchcode']}`
    ]);
   maintable1 = await db.query(`INSERT INTO members(m_recno,m_name,m_no,m_mobno,m_adr1,m_adr2,m_adr3,m_branchcode,m_randomid)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
   [
    maxMemberrecno["rows"][0]["m_recno"] + 1,
    m_name,
    `${ledgerMemno['rows'][0]['memno']+1}${branchRecno['rows'][0]['br_recno']}`,
    m_mobno,
    m_adr1,
    m_adr2,
    m_adr3,
    'SHP',
    `${randomId}${branch['rows'][0]['branchcode']}`
   ]); 
   if (maintable != 0 && maintable1 != 0) {
    var senddata = {
      status: "Insert Successfully",
    };
  } else {
    var senddata = {
      status: "Insert Failed",
    };
  }

}else{
    var senddata = {
        status : "In this Customer Already Exist"
    }
}
} catch (error) {
  console.log(error);
  var senddata = {
    status: "Insert Failed",
  };
}
return res.json(senddata);

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
  return result;
}
module.exports = route;