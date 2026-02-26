const express = require("express");
const { getProfile, updateProfile, updateSettings, updatePassword } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/settings", authMiddleware, updateSettings);
router.put("/update-password", authMiddleware, updatePassword);

// 2FA Routes
const { generate2FA, verifyEnable2FA, disable2FA } = require("../controllers/userController");
router.post("/2fa/generate", authMiddleware, generate2FA);
router.post("/2fa/verify", authMiddleware, verifyEnable2FA);
router.post("/2fa/disable", authMiddleware, disable2FA);

module.exports = router;
