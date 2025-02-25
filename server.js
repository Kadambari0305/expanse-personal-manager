const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');

// ✅ Load environment variables before anything else
dotenv.config();

// ✅ Debug log to check if .env variables are loaded correctly
console.log("MONGO_URL:", process.env.MONGO_URL);
if (!process.env.MONGO_URL) {
    console.error("❌ MONGO_URL is not set in .env file!".red);
    process.exit(1);  // Exit if MongoDB URL is missing
}

// ✅ Database connection
connectDb()
    .then(() => {
        // ✅ Create Express app only if DB connects successfully
        const app = express();

        // ✅ Middleware
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(cors());

        // ✅ Routes 
        app.use('/api/v1/users', require('./routes/userRoute'))

        // ✅ Port setup
        const PORT = process.env.PORT || 8080;

        // ✅ Start server only after DB is connected
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`.bgGreen.black);
        });
    })
    .catch((error) => {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`.red);
        process.exit(1);  // Exit the process if DB fails
    });
