const express = require("express");
const { now } = require("lodash");
const router = express.Router();
// const bcrypt = require("bcrypt");
const _ = require("lodash");
const { myKdod }  = require("../models/kdod");

//Fetch Next Available KDOD Number
router.get("/:id", async (req, res) => {
    let userid=req.params.id;
    let Kdod = await myKdod.sequelize.query("SELECT fn_nextKdod('"+ userid+"') as kdod_num");
    res.json(Kdod[0]);});

//Fetch UnAssigned KDOD Number
router.get("/pkdod/", async (req, res) => {
   // let userid=req.params.id;
    let Kdod = await myKdod.findOne({where: {c_status: '1'}});
    res.json(Kdod);   //requested_by:userid
  });


  //Update Status of KDOD Number to Assigned
  router.post("/ukdod/:kdod", async (req, res) => {

    let Kdod = await   myKdod.update({c_status: '2', assigned_date: now()}, {where: { kdod_num: req.params.kdod} })

        if(Kdod=='1')
        {
            return res
            .status(200)
            .send(`KDOD Number Updated Succesfully`);
        }else
        {
            return res
            .status(200)
             .send(`Not Updated KDOD Number: ${req.params.kdod} was not found`);
        }

        });



module.exports = router;