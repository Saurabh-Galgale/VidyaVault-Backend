const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/SendEmail")
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {

    const { name, email, password } = req.body;

    if (!email) {
        return res.status(422).json({ status: false, message: "Missing email." });
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        return res.status(409).json({
            status: false,
            message: "Email is already in use."
        });
    }

    try {
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // // now we set user password to hashed password
        let encryptedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: encryptedPassword
        })

        let saved = await user.save();

        if (!saved) {
            res.json({ message: "Not able to save user!" });
        } else {
            res.json({
                status: true,
                message: "User registered successfully!",
                data: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            });
        }
    } catch (error) {
        res.status(400).json({ status: false, message: "Something went wrong" });
    }
};

const signin = async (req, res) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ status: false, message: "Missing email." });
    }

    try {

        const user = await User.findOne({ email });

        if (user) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                res.json({
                    status: true,
                    message: "Loggedin successfully!",
                    data: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        token: generateToken(user._id)
                    }
                });
            } else {
                res.json({ status: false, message: "Invalid Password" });
            }
        } else {
            res.json({ status: false, message: "User not found!" });
        }

    } catch (error) {
        res.status(400).json({ status: false, message: "Something went wrong" });
    }
};

let getUser = async (req, res) => {
    let userid = req.params.id;
    let Data;
    try {
        let user = await User.findById(userid)
            .populate('org')
            .populate('ownCourses')
            .populate('subscriptions')
            .populate('memberships')
            .then(p => {
                Data = p;
            })
            .catch(error => console.log(error));

        res.json({
            status: true,
            data: Data
        });
    } catch (error) {
        res.json({ status: false, message: "User not found!" });
    }
}

let userResetPass = async (req, res) => {
    let email = req.body.email;

    if (!email) {
        return res.status(422).json({ status: false, message: "Missing email." });
    }
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
        return res.status(409).json({
            status: false,
            message: "User does not exist."
        });
    }

    const token = generateToken(existingUser._id);

    const Link = `http://localhost:3000/passwordreset?token=${token}&id=${existingUser._id}`;

    try {
        sendEmail(email, "Reset password", Link);
        res.send("send email success");
    } catch (error) {
        res.json({ status: false, message: "Server failed to send email" });
    }
}

let updateUser = async (req, res) => {
    const { name, password, avatar } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        // // now we set user password to hashed password
        let encryptedPassword = await bcrypt.hash(password, salt);

        let upUser = await User.findOneAndUpdate({ _id: req.params.id }, { name, avatar, password: encryptedPassword })
        if (!upUser) {
            res.send("update not saved")
        } else {
            res.json({ status: true, message: "User updated seccessfuly" });
        }
    } catch (error) {
        res.json({ status: false, message: "User update failed" });
    }
}

module.exports = { signup, signin, getUser, userResetPass, updateUser };