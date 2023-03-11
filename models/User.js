const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ownCourses: [{
        courseName: { type: String },
        courseId: { type: String },
        totalSubscribers: { type: Number },
        subscribers: [{ type: String }]
    }],
    subscriptions: [{
        courseName: { type: String },
        courseId: { typr: String },
        complete: [{ type: String }]
    }],
    memberships: [{
        orgName: { type: String },
        orgId: { type: String }
    }]
});

const User = new mongoose.model("User", UserSchema);

module.exports = { User };