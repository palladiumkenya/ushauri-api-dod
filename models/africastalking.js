const config = {
    apiKey: "972bdb6f53893725b09eaa3581a264ebf77b0e816ef5e9cb9f29e0c7738e41c1",
    username: "Ushauri_KE"
};
const AfricasTalking = require("africastalking")(config);
const sms = AfricasTalking.SMS;

function sendSMS(number, msg) {
    let num;
    if (number.includes("+254")) {
        num = number;
    } else {
        num = number.substr(1);
        num = "+254" + num;
    }
    const options = {
        from: "40146",
        to: num,
        message: msg
    };
    return sms
        .send(options)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.toString();
        });
}

exports.Sender = sendSMS;
