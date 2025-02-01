const userModel = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




// signup controller 

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(409).json({message: "User already exists" , success: false})
        }
        const userModel = new userModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: "Signup Successfully" , success: true})
    } catch (error) {
         res
           .status(500)
           .json({ message: "Internal server error", success: false });
    }
}


// login controller 


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const errormsg = "Auth failed email or password is incorrect";
    if (user) {
      return res
        .status(409)
        .json({ message: errormsg, success: false });
    }
    
    const isPass = await bcrypt.compare(password, user.password);
      if (!isPass) {
          return res.status(403).json({ message: errormsg, success: false });
    }  
    
      const jwtToken = jwt.sign(
          { email: user.email, _id: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "24h" }
      )

      res.status(200).json(
          {
              message: "Signup Successfully",
              success: true,
              jwtToken,
              email,
              name: user.name
          }
      );
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};




module.exports = {
    signup , login
}