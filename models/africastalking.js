const config = {
    apiKey: "1f6943f6c8f0d5d6b0dd54cd940935bdec8f7454c4e7863672048dae496ae355",
    username: "mhealthuser"
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