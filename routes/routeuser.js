const express = require("express");
const router = express.Router();
const multer = require('multer');

const {userRegister, updateUser, updatePassword, signup, verifyEmail } = require("../controllers/usercontroller");

const upload = multer({ dest: 'uploads/' });

router.post("/userRegister",userRegister);
router.put('/update-user/:username',upload.single('image'),updateUser );
router.put('/updateuserpwd/:username', updatePassword);
router.post('/signupuser', signup);            // Signup with email verification
router.post('/verify-email-user', verifyEmail);     // The endpoint for the verification page where we enter the verification code

module.exports = router;