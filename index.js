const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("express-async-errors");
require("dotenv").config();

// const users = require("./routes/users");
const clients = require("./routes/clients");
const app_diary = require("./routes/appointment_diary");
const cleaner = require("./routes/cleaner");
const verify = require("./routes/processes/verify_mflcode");
const todaysAppointments = require("./routes/processes/process_today_appointment");
const pastAppointments = require("./routes/processes/process_past_appointment");
const sender = require("./routes/processes/sender");
const mlab = require("./routes/processes/mlab");
const dfc = require("./routes/processes/process_dfc");
const pmtct = require("./routes/processes/process_pmtct");
const editApps = require("./routes/processes/edit_appointment");
const terms = require("./routes/terms");
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/clients", clients);
app.use("/cleaner", cleaner);
app.use("/sender", sender);
app.use("/receiver", app_diary);
app.use("/verifyMFLCode", verify);
app.use("/today_appointments", todaysAppointments);
app.use("/past_appointments", pastAppointments);
app.use("/api/mlab", mlab);
app.use("/api/process_dfc", dfc);
app.use("/api/process_pmtct", pmtct)
app.use("/api/edit_appointment", editApps)
app.use("/terms", terms)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Ushauri Web App started. Listening on Port: ${PORT}`)
);