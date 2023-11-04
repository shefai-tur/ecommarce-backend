const emailvalidation = require("../../helpers/emailvalidation");
const bcrypt = require("bcrypt");
const User = require("../../model/usermodel.js");

let LoginContoroller = async (req, res) => {
  let { email, password } = req.body;
  if (!email) {
    return res.send({ error: "Email Is Requird" });
  } else if (!emailvalidation(email)) {
    return res.send({ error: "Enter Your Correct Email" });
  } else if (!password) {
    return res.send({ error: "Password Is Requird" });
  } else {
    let isExistEmail = await User.find({ email });
    if (isExistEmail.length > 0) {
      bcrypt.compare(
        password,
        isExistEmail[0].password,
        function (err, result) {
          // result == true
          if (result) {
            res.send({
              sucses: "Login Sucsesfully",
              fullName: isExistEmail.fullName,
              email: isExistEmail.email,
            });
          } else {
            return res.send({ error: "Password Not Match" });
          }
        }
      );
    } else {
      return res.send({ error: "Email Not Match" });
    }
  }
};

module.exports = LoginContoroller;
