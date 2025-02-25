const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {  // ✅ Add 'async' keyword
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);    
    } catch (error) {
        console.log(`${error}`.bgRed);  // ✅ Fix background color syntax
    }
};

module.exports = connectDb;
