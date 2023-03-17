const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrganizationSchema = new mongoose.Schema({
    orgName: { type: String, required: true, minlength: 1, maxlength: 20, unique: true },
    description: {
        goal:{ type: String },
        slogan:{ type: String }
    },
    banner: { type: String, default: 'https://res.cloudinary.com/dlmfyhkgx/image/upload/v1678770772/orgBanner.png' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    courseCount: { type: Number, default: 00 },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{ timestamps: true }
);

const Organization = new mongoose.model("Organization", OrganizationSchema);

module.exports = { Organization };


