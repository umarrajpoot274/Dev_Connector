const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 of more charcter"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // checking validation of email, password
    const { name, email, password } = req.body;

    try {
      //if user exist
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: "User Already exist",
            },
          ],
        });
      }

      //Get user Gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", //reading
        d: "mm", //default helps in showing image
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //for encryption

      //Encrypt password
      const salt = await bcrypt.genSalt(10); //10 rounds

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      //sign token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
