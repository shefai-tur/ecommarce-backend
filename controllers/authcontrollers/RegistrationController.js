const emailvalidation = require("../../helpers/emailvalidation.js");
const User = require("../../model/usermodel.js");
const bcrypt = require("bcrypt");
const otpTemplate = require("../../helpers/otpTemplate.js")
const sendEmail = require("../../helpers/sendEmail.js")
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
 
async function RegistrationController(req, res) {
  const { fullName, email, password, facebookid, linkedinid } = req.body;
  if (!fullName) {
    return res.send({ error: "your Name Is Requird" });
  } else if (!email) {
    return res.send({ error: "Email Is Requird" });
  } else if (!emailvalidation(email)) {
    return res.send({ error: "Enter Your Correct Email" });
  } else if (!password) {
    return res.send({ error: "Password Is Requird" });
  } else {
    let ExistingEmail = await User.find({ email: email });
    if (ExistingEmail.length > 0) {
      return res.send({ error: "Email Alrady exist. Try another" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      const user = new User({
        fullName,
        email,
        password: hash,
      });

      user.save();

      const generator2 = aleaRNGFactory(Date.now());
      let randomNumber=generator2.uInt32().toString().substring(0,4)

      let rendomOtpStore = await User.findOneAndUpdate({email},
        {$set:{randomOtp:randomNumber}},{new:true})
       
      sendEmail(email,randomNumber,otpTemplate)

        setTimeout(async function(){
          let removeOtpaTimeout = await User.findOneAndUpdate({email},
            {$unset:{randomOtp:""}},{new:true})
        },90000) 

      res.send({
        sucses: "Registration Sucsesfully",
        fullName: user.fullName,
        email: user.email,
      });
    });
    // return res.send({"sucses":"Registration Sucsesfully"})
  }
}
module.exports = RegistrationController;
