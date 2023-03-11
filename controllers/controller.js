const { User, Admin, Course } = require("../models/models");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// const signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         // generate salt to hash password
//         const salt = await bcrypt.genSalt(10);
//         // now we set user password to hashed password
//         let encryptedPassword = await bcrypt.hash(password, salt);

//         const user = new User({
//             name,
//             email,
//             password: encryptedPassword
//         });

//         let saved = await user.save();

//         res.json({
//             status: true,
//             message: "User registered successfully!",
//             data: {
//                 id: user._id,
//                 email: user.email,
//                 name: user.name
//             }
//         });
//     } catch (error) {
//         res.json({ status: false, message: "User already exist!" });
//     }
// };

// const signin = async (req, res) => {

//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user) {
//         // check user password with hashed password stored in the database
//         const validPassword = await bcrypt.compare(password, user.password);

//         if (validPassword) {
//             res.json({
//                 status: true,
//                 message: "Loggedin successfully!",
//                 data: {
//                     id: user._id,
//                     email: user.email,
//                     name: user.name,
//                     token: generateToken(user._id)
//                 }
//             });
//         } else {
//             res.json({ status: false, message: "Invalid Password" });
//         }
//     } else {
//         res.json({ status: false, message: "User not found!" });
//     }
// };

let createCourse = async (req, res) => {
    let userId = req.params.id;
    let { courseName, description } = req.body;
    try {
        let cc = await new Course({ courseName, description, userId });
        cc.save();
        let updateUser = await User.findById(userId);
        updateUser.ownCourses.push({ courseName: cc.courseName, courseId: cc._id });
        updateUser.save();
        res.json({ cc, updateUser });
    } catch (error) {
        res.json({ status: false, message: "course creation failed" });
    }
}

let Subscribe = async (req, res) => {
    let userId = req.params.id;
    let { courseId, courseName } = req.body;
    try {
        let findUser = await User.findById(userId);
        findUser.subscriptions.push({ courseName, courseId });
        findUser.save();
        let findCourse = await Course.findById(courseId);
        findCourse.access.push(userId);
        findCourse.save();
        res.json({ findUser, findCourse });
    } catch (error) {
        res.json({ status: false, message: "Subscription failed" });
    }
}

let upload = async (req, res) => {
    // const user = req.user;
    let { user, course, file } = req.body;
    const ucourse = await Course.find({ user });

    if (income) {
        res.json({
            status: true,
            data: ucourse
        });
    } else {
        res.json({ status: false, message: "Data not found!" });
    }
}

let getFeed = async (req, res) => {
    try {
        let courseFeed = await Course.find();
        res.json({
            status: true,
            data: courseFeed
        });
    } catch (error) {
        res.json({ status: false, message: "Data not found!" });
    }
}
// let getUser = async (req, res) => {
//     let userid = req.params.id;
//     try {
//         let user = await User.findById(userid);
//         res.json({
//             status: true,
//             data: user
//         });
//     } catch (error) {
//         res.json({ status: false, message: "User not found!" });
//     }
// }

// module.exports = { createCourse, upload, getFeed, Subscribe };