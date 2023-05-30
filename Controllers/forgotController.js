const User = require("../Models/userModel");
const oTp = require("../Models/otpmodel");
const nodemailer = require("nodemailer");
const bycrypt = require("bcryptjs");

const checkEmail = async (req, res) => {
  try {
    const { checkEmail } = req.body;
    if (!checkEmail) {
      return res.status(406).send("All field are required");
    }
    const emailExist = await User.findOne({ email: checkEmail });

    if (!emailExist) {
      return res.status(404).send("Invalid Email");
    } else {
      const otpcol = await oTp.findOne({ email: checkEmail });
      if (otpcol) {
        const otpCode = Math.floor(Math.random() * 10000 + 1);
        const otp = otpCode.toString();
        mailer(emailExist.email, otp);
        const updateCol = async (_id) => {
          const result = await oTp.updateOne(
            { _id },
            {
              $set: {
                otp: otp,
              },
            }
          );
        };
        updateCol(otpcol._id);
        return res.status(201).send("ok ni ok ");
      } else {
        const otpCode = Math.floor(Math.random() * 10000 + 1);
        const otpData = new oTp({
          email: checkEmail,
          otp: otpCode,
        });
        await otpData.save();
        const otp = otpCode.toString();
        mailer(emailExist.email, otp);
        return res.status(200).send("OK Ho geya ");
      }
    }
  } catch (e) {
    res.send(e);
  }
};

const mailer = (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "muhammadtalha2199@outlook.com",
      pass: "mernstack2199",
    },
  });
  const mailOption = {
    from: "muhammadtalha2199@outlook.com",
    to: email,
    subject: "OTP Code of Talksians Recovery password",
    text: code,
  };
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log("email na send na hony ka error ");
      console.log(error);
    } else {
      console.log(`Email Sent : ${info.response}`);
    }
  });
};
const checkOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const otpExist = await oTp.findOne({ otp, email });
    if (otpExist) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("Invalid OTP");
    }
  } catch (e) {
    res.send(e);
  }
};

const updateNewPassword = async (req, res) => {
  try {
    // console.log(req.body);
    const { password, email } = req.body;
    if (!password || !email) {
      res.status(400).send("ALL Field Are Required");
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      const bypass = await bycrypt.hash(password, 10);
      const updateCollection = async (_id) => {
        const result = await User.updateOne(
          { _id },
          {
            $set: {
              password: bypass,
            },
          }
        );
      };

      updateCollection(emailExist._id);
      res.status(200).send("ok ho geya ")
    } else {
      res.status(404).send("EMail ni labha kam wad geya a ");
    }
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  checkEmail,
  checkOtp,
  updateNewPassword,
};
