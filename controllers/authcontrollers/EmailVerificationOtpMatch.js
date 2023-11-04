const User = require("../../model/usermodel.js")

let EmailVerificationOtpMatch = async(req,res)=>{
    const {email,randomOtp}=req.body
    let findOtp = await User.find({email})
    if(findOtp.length > 0){
        if(randomOtp == findOtp[0].randomOtp ){
            res.json({"success":"OTP Match"})
            let romoveOtpAfeterMatch = await User.findOneAndUpdate({email},
                {$unset:{randomOtp:""}},{new:true})
        }else{
            res.json({"error":"OTP Not Match try Agin"})   
        }
    }

}
module.exports=EmailVerificationOtpMatch