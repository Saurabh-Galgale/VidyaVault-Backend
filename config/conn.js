const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`MongoDB connected`);
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        });
};

module.exports = { connectDB };