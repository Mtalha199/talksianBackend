const checkUser = require("../Models/checkmodel");
const User = require("../Models/userModel");
const bycrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { aridno, name, cnic, fathername, email, password ,isAdmin} = req.body;
    if (!aridno || !name || !cnic || !fathername || !email || !password) {
      return res.status(406).send("ALL field are required");
    }
    const checkuser = await checkUser.findOne({
      aridno,
      name,
      cnic,
      fathername,
    });
    if (!checkuser) {
      return res
        .status(401)
        .send(
          "You are not eligible for signup this platform is only for aridians"
        );
    } else {
      const userExist = await User.findOne({ aridno });
      if (userExist) {
        return res.status(400).send("User already axist");
      }

      const bypass = await bycrypt.hash(password, 10);
      const user = new User({
        aridno,
        name,
        cnic,
        fathername,
        email,
        password: bypass,
        isAdmin,
      });
      await user.save();
      res.status(201).send("User added successfully ");
    }
  } catch (e) {
    res.send(e);
  }
};

const login = async (req, res) => {
  const { aridNo, password } = req.body;
  if (!aridNo || !password) {
    return res.status(406).send("All Field are Required");
  }
  const aridnoExist = await User.findOne({ aridno: aridNo });

  if (!aridnoExist) {
    return res.status(403).send("Invalid Arid no OR Password");
  } else {
    const matchpassword = await bycrypt.compare(password, aridnoExist.password);
    if (matchpassword) {
      const token = jsonwebtoken.sign({ _id: aridnoExist.id }, "talha199");
      // console.log(aridnoExist)
      return res.status(201).send({ token,aridnoExist });
    } else {
      return res.status(406).send("Invalid Arid no OR Password");
    }
  }
};

const checkUsers = async (req, res) => {
  try {
    const checkuser = new checkUser(req.body);
    const result = await checkuser.save();
    return res.send(result);
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  signup,
  login,
  checkUsers,
};
