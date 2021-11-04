const { validateClient, Client } = require("../models/client");
const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
const _ = require("lodash");
const {Rank} = require("../models/tbl_rank");
const {Partner} = require("../models/partner");
const {Unit} = require("../models/unit");

router.get("/", async (req, res) => {
  let clients = await Client.findAll({ limit: 100 });
  if (!clients) return res.status(400).send("No Clients found");
  res.send(
    clients.map(
      ({
        clinic_number,
        f_name,
        m_name,
        l_name,
        dob,
        phone_no,
        mfl_code,
        status,
        client_status,
        gender,
        marital,
        smsenable,
        createdAt
      }) => ({
        clinic_number,
        f_name,
        m_name,
        l_name,
        dob,
        phone_no,
        mfl_code,
        status,
        client_status,
        gender,
        marital,
        smsenable,
        createdAt
      })
    )
  );
});

router.get("/service", async (req, res) => {
  let service = await Partner.findAll();
  res.send(service);
});

router.get("/unit/:id", async (req, res) => {
  let unit = await Unit.findAll({where: {service_id: req.params.id}});
  res.send(unit);
});

router.get("/rank", async (req, res) => {
  let ranks = await Rank.findAll({where: {status: "Active"}});
  res.send(ranks);
});

router.get("/service/:id", async (req, res) => {
  let partner = await Partner.findOne({ where: { id: req.params.id }});
  res.send(partner);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const client = await Client.findByPk(id);

  if (!client)
    return res
      .status(400)
      .send(`Client with the given id: ${id} was not found`);
  res.send(
    _.pick(client, [
      "clinic_number",
      "f_name",
      "m_name",
      "l_name",
      "dob",
      "phone_no",
      "mfl_code",
      "status",
      "client_status",
      "gender",
      "marital",
      "smsenable",
      "createdAt"
    ])
  );
});


router.post("/", async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let client = req.body;

  Client.create(client)
    .then(function(model) {
      let message = "OK";
      let response = "Client successfully added.";

      res.json({
        message: message,
        response: {
          msg: response,
          client: _.pick(client, [
            "id",
            "f_name",
            "m_name",
            "l_name",
            "dob",
            "phone_no",
            "partner_id",
            "facility_id",
            "status",
            "clinic_id",
            "createdAt"
          ])
        }
      });
    })
    .catch(function(err) {
      code = 500;
      response = err.message;

      res.json({
        response: {
          msg: response,
          error: err
        }
      });
    });
});

router.put("/:id", async (req, res) => {
  let client = await Client.findByPk(req.params.id);

  if (!client)
    return res
      .status(400)
      .send(`Client with the given id: ${req.params.id} was not found`);

  Client.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(function([rowsUpdate, [updatedClient]]) {
      message = "OK";
      response = "Client successfully updated.";

      res.json({
        message: message,
        response: {
          msg: response,
          client: _.pick(updatedClient, [
            "id",
            "f_name",
            "m_name",
            "l_name",
            "dob",
            "phone_no",
            "email",
            "partner_id",
            "facility_id",
            "status",
            "clinic_id",
            "createdAt"
          ])
        }
      });
    })
    .catch(function(err) {
      code = 500;
      response = err.message;

      res.json({
        response: {
          msg: response,
          error: err
        }
      });
    });
});

router.delete("/:id", async (req, res) => {
  let client = await Client.findByPk(req.params.id);

  if (!client)
    return res
      .status(400)
      .send(`Client with the given id: ${req.params.id} was not found`);

  Client.destroy({
    where: { id: req.params.id }
  })
    .then(deletedClient => {
      message = "OK";
      response = "Client successfully deleted.";
      res.json({
        message: message,
        response: {
          msg: response,
          client: deletedClient
        }
      });
    })
    .catch(function(err) {
      code = 500;
      response = err.message;

      res.json({
        response: {
          msg: response,
          error: err
        }
      });
    });
});

module.exports = router;
