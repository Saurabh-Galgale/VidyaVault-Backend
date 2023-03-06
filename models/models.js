const mongoose = require("mongoose");

const OrgSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  Course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ownCourses: [{
    courseName: { type: String },
    courseId: { type: String }
  }],
  subscriptions: [{
    courseName: { type: String },
    courseId: { typr: String }
  }],
  memberships: [{
    orgName: { type: String },
    orgId: { type: String }
  }]
});

const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  thumbnail: { type: String },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  access: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

const filesSchema = new mongoose.Schema({
  courseId: { type: String },
  courseFiles: [{
    fileName: { type: String },
  }]
});

const Course = new mongoose.model("Course", CourseSchema);
const User = new mongoose.model("User", UserSchema);

module.exports = { Course, User };
