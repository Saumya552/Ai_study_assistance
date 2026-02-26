const User = require("../models/User");

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { $set: { settings: req.body } }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!(await user.comparePassword(oldPassword))) {
            return res.status(400).json({ message: "Incorrect old password" });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.generate2FA = async (req, res) => {
    const { authenticator } = require("otplib");
    const qrcode = require("qrcode");
    try {
        const user = await User.findById(req.user.id);
        const secret = authenticator.generateSecret();
        const otpauth = authenticator.keyuri(user.email, "AI Study Assistant", secret);

        const qrCodeUrl = await qrcode.toDataURL(otpauth);

        // Temporarily store secret in user object (not enabled yet)
        user.twoFactorSecret = secret;
        await user.save();

        res.json({ qrCodeUrl, secret });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.verifyEnable2FA = async (req, res) => {
    const { token } = req.body;
    const { authenticator } = require("otplib");
    try {
        const user = await User.findById(req.user.id);
        const isValid = authenticator.check(token, user.twoFactorSecret);

        if (!isValid) {
            return res.status(400).json({ message: "Invalid 2FA token" });
        }

        user.isTwoFactorEnabled = true;
        await user.save();

        res.json({ message: "2FA enabled successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.disable2FA = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.isTwoFactorEnabled = false;
        user.twoFactorSecret = undefined;
        await user.save();
        res.json({ message: "2FA disabled successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
