const express = require("express");
router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/profile");
const User = require("../../models/user");
const Post = require("../../models/post");
//@route  get api/profile/me
//@dec    Get current user Profile
//@access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    // if no profile
    if (!profile) {
      return res.status(400).json({
        msg: "No Profile Found.",
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Create and update User Profile
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //update user profile
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = req.body;

    const profileField = {}; // build profile Object
    profileField.user = req.user.id;
    if (company) profileField.company = company;
    if (website) profileField.website = website;
    if (location) profileField.location = location;
    if (bio) profileField.bio = bio;
    if (status) profileField.status = status;
    if (githubusername) profileField.githubusername = githubusername;
    if (skills)
      profileField.skills = skills.split(",").map((skill) => skill.trim()); // formated string in array
    profileField.social = {}; // build social object
    if (youtube) profileField.social.youtube = youtube;
    if (facebook) profileField.social.facebook = facebook;
    if (twitter) profileField.social.twitter = twitter;
    if (linkedin) profileField.social.linkedin = linkedin;
    if (instagram) profileField.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update if profile found
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );

        return res.json(profile);
      }
      // if profile not found create and save it
      profile = new Profile(profileField);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//get all profile by user Id
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});
// get specific user
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]); // that user logged in
    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile for this user.",
      });
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        msg: "Profile is not found",
      });
    }
    res.status(500).send("Server Error.");
  }
});

// Delete Profile and Account
router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({
      user: req.user.id,
    });
    await User.findByIdAndRemove({
      _id: req.user.id,
    });
    res.json({
      msg: "User Deleted",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});
//Add profile Experience
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      website,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      website,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp); //pushing values in newExp
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
//Delete Experience

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id); // Matching with exp_id using indexOf
    profile.experience.splice(removeIndex, 1); //removing the profile experience using splice
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});
//Add Profile Education
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newExp); //pushing values in newExp
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
//Delete Education

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id); // Matching with exp_id using indexOf
    profile.education.splice(removeIndex, 1); //removing the profile experience using splice
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
