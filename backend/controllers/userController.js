import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    
    const user = await userModel.findOne({email});

    if(!user){
      return res.json({success: false, message: "Người dùng không tồn tại"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
      const token = createToken(user._id);
      res.json({success: true, token});
    }
    else{
      return res.json({success: false, message: "Mật khẩu không đúng"})
    }

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    // kiem tra email da ton tai hay chua
    const exists = await userModel.findOne({email});
    if(exists){
      return res.json({success: false, message: "Nguoi dung da ton tai!"});
    }
    
    // Xac thuc email va mat khau
    if(!validator.isEmail(email)){
      return res.json({success: false, message: "Email khong hop le!"});
    }
    if(password.length < 8){
      return res.json({success: false, message: "Mat khau toi thieu la 8 ky tu!"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({success: true, token});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

const adminLogin = async (req, res) => {

}

export {
  loginUser,
  registerUser,
  adminLogin
}