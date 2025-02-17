const app = require('./index'); // ✅ Import Express app from index.js

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send("✅ Backend is running! Use the API routes like /auth and /data.");
});
