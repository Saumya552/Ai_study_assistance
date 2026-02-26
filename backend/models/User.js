const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    subscriptionStatus: { type: String, enum: ["free", "basic", "pro"], default: "free" },

    // 2FA Fields
    twoFactorSecret: { type: String },
    isTwoFactorEnabled: { type: Boolean, default: false },

    // Profile Fields
    specialization: { type: String },
    bio: { type: String },
    location: { type: String },
    phone: { type: String },

    // Settings
    settings: {
        emailNotifications: { type: Boolean, default: true },
        pushNotifications: { type: Boolean, default: true },
        aiFeaturesEnabled: { type: Boolean, default: true },
        debugModeEnabled: { type: Boolean, default: false }
    },

    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
