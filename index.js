const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

var agent = require("./controllers/agent.js");
var ledger_member = require("./controllers/ledger_member.js");
var member = require("./controllers/member.js");
var customer = require("./controllers/customer.js");
var search = require("./controllers/search.js");
var collection = require("./controllers/collection.js");
var newcustomer_newmember = require("./controllers/newcustomer_newmember.js");
var group = require("./controllers/group.js");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Orgin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPRIONS"
  );
  next();
});

app.listen(3100, () => console.log("Server started"));

app.use("/agent", agent);
app.use("/ledger_member",ledger_member);
app.use("/member",member);
app.use("/customer",customer);
app.use("/search",search);
app.use("/collection",collection);
app.use("/newcustomer_newmember",newcustomer_newmember);
app.use("/group",group);