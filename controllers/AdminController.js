const { User } = require("../models/User");
const { Organization } = require("../models/Organization");
const bcrypt = require("bcrypt");
const {sendEmail} = require("../utils/SendEmail")
const generateToken = require("../utils/generateToken");

const adminSignup = async (req, res) => {

    const { name, email, password, orgName, description } = req.body;

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
            password: encryptedPassword,
            isAdmin: true
        })

        let saved = await user.save();

        let admin = saved._id

        const organization = new Organization({
            orgName, 
            description, 
            admin: admin
        })

        let orgs = await organization.save();

        let getadmin = await User.findById(admin)
        getadmin.org = orgs._id;
        let final = await getadmin.save();

        if (!saved && !final) {
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


let adminResetPass = async (req, res) => {
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


module.exports = { adminSignup, adminResetPass }

