const Subscription = require("../models/Subscription");
const User = require("../models/User");

exports.getSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({ userId: req.user.id });
        res.json(subscription || { plan: "free" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateSubscription = async (req, res) => {
    const { plan } = req.body;
    try {
        let subscription = await Subscription.findOne({ userId: req.user.id });
        if (subscription) {
            subscription.plan = plan;
            await subscription.save();
        } else {
            subscription = new Subscription({ userId: req.user.id, plan });
            await subscription.save();
        }
        await User.findByIdAndUpdate(req.user.id, { subscriptionStatus: plan });
        res.json(subscription);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.cancelSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOneAndUpdate(
            { userId: req.user.id },
            { status: "cancelled" },
            { new: true }
        );
        await User.findByIdAndUpdate(req.user.id, { subscriptionStatus: "free" });
        res.json(subscription);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.initiatePayment = async (req, res) => {
    const { plan, amount } = req.body;
    // Real-world logic would involve calling PhonePe API here
    // For this demonstration, we return a mock QR code URL
    const mockQrCode = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=phonepe://pay?pa=ai.study@upi%26pn=AI%20Study%20Assistant%26am=" + amount;

    res.json({
        orderId: "order_" + Date.now(),
        amount,
        plan,
        qrCodeUrl: mockQrCode,
        message: "Scan with PhonePe to complete payment"
    });
};

exports.verifyPayment = async (req, res) => {
    const { plan, userId } = req.body;
    const targetUserId = userId || req.user.id;
    try {
        let subscription = await Subscription.findOne({ userId: targetUserId });
        if (subscription) {
            subscription.plan = plan;
            subscription.status = "active";
            await subscription.save();
        } else {
            subscription = new Subscription({ userId: targetUserId, plan, status: "active" });
            await subscription.save();
        }
        await User.findByIdAndUpdate(targetUserId, { subscriptionStatus: plan });
        res.json({ message: "Payment verified and subscription activated successfully", plan });
    } catch (err) {
        res.status(500).json({ message: "Error activating subscription" });
    }
};
