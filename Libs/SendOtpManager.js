// const account_sid = 'ACe35e0d9bd537cca4bcd12886a742b845';
// const auth_token = 'a5ba42d99213eb4bd6340b42d0591a22';
// const client = require('twilio')(account_sid, auth_token);
// const twillo_phone_no = +19086664337

const account_sid = "ACcc13e03c915685d00dd7410ea878e610";
const auth_token = "7978c85f34f7bdd2059764214bece19b";
const client = require("twilio")(account_sid, auth_token);
const twillo_phone_no = +14314417450;

const send_sms = async (country_code, phone_no, body) => {
  try {
    let options = {
      body: body,
      from: twillo_phone_no,
      to: country_code + phone_no,
    };

    await client.messages
      .create(options)
      .then((message) => console.log("send_message ->", message));

    // return null;
  } catch (err) {
    console.log("------------------err-", err.message);
    // throw err;
  }
};

module.exports = {
  send_sms: send_sms,
};


