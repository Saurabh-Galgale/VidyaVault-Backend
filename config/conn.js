const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = mongoose.connect(`mongodb+srv://${process.env.MONGOU}:${process.env.MONGOP}@${process.env.MONGOC}.bqgmeka.mongodb.net/?retryWrites=true&w=majority/vidyavault`)
        .then(() => {
            console.log(`MongoDB connected`);
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        });
};

module.exports = { connectDB };