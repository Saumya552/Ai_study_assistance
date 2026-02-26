const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if 2FA is enabled
        if (user.isTwoFactorEnabled) {
            return res.json({
                requireTwoFactor: true,
                userId: user._id,
                message: "2FA token required"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({
            token,
            role: user.role,
            name: user.name,
            email: user.email,
            subscriptionStatus: user.subscriptionStatus
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.verifyTwoFactor = async (req, res) => {
    const { userId, token } = req.body;
    const { authenticator } = require("otplib");

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValid = authenticator.check(token, user.twoFactorSecret);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid 2FA token" });
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({
            token: jwtToken,
            role: user.role,
            name: user.name,
            email: user.email,
            subscriptionStatus: user.subscriptionStatus
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
