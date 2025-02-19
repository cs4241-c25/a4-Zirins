const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
    try {
        const user = await User.register(new User({ username: req.body.username }), req.body.password);
        res.json({ message: "User registered", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: "Logged in", user: req.user });
});

// Logout Route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }

        // 🔹 Explicitly clear session cookie
        res.clearCookie("connect.sid", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ Secure in production
            sameSite: "None", // ✅ Allows cross-site authentication
        });

        res.status(200).json({ message: "Logged out successfully" });
    });
});


// Auth
router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ status: "authenticated", user: req.user });
    } else {
        res.json({ status: "not authenticated" });
    }
});

// Redirect to GitHub for login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback (handles the redirect after login)
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        console.log("✅ GitHub Login Successful:", req.user);
        res.redirect('https://a4-zirins.vercel.app/');
    }
);

module.exports = router;