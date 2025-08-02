const mongoose = require('mongoose');
require('dotenv').config(); // ✅ Load variables from .env

const connection = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Database is connected");
}).catch((err) => {
    console.error("❌ DB connection error:", err.message);
});

module.exports = connection;
