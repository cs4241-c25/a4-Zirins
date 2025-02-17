require('dotenv').config();

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const MongoStore = require('connect-mongo');
const User = require('./models/User');
const Task = require('./models/Task');
const cors = require('cors');


const app = express();

app.set('trust proxy', 1);  // For secure cookies behind a proxy

app.use(cors({
    origin: [
        "https://a4-zirins.vercel.app", // Allow requests from frontend
        "http://localhost:5173" // Allow local frontend testing (Vite)
    ],
    credentials: true, // Allow session cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

mongoose.connection.on('error', err => console.error('❌ MongoDB Error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Secure Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// GitHub Authentication Setup
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL, // Ensure this is correct
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("✅ GitHub Profile:", profile);

                // Check if user exists, if not, create one
                let user = await User.findOne({ githubId: profile.id });
                if (!user) {
                    user = new User({
                        githubId: profile.id,
                        username: profile.username,
                        email: profile.emails ? profile.emails[0].value : "",
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Serve Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/data', require('./routes/dataRoutes'));

// Task Creation Route (No Need for `express.static`)
app.post('/data/add', async (req, res) => {
    console.log("📩 Received task data:", req.body);
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "❌ Not authenticated" });
    }

    try {
        const newTask = new Task({
            content: req.body.content,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            userId: req.user._id
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error("❌ Task Save Error:", err);
        res.status(500).json({ error: "Could not save task" });
    }
});

module.exports = app;
