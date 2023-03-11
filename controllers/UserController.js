const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // // now we set user password to hashed password
        let encryptedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: encryptedPassword
        });

        console.log(user);

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
        res.status(400).json({ status: false, message: "Error" });
    }
};

const signin = async (req, res) => {

    const { email, password } = req.body;
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
};

let getUser = async (req, res) => {
    let userid = req.params.id;
    try {
        let user = await User.findById(userid);
        res.json({
            status: true,
            data: user
        });
    } catch (error) {
        res.json({ status: false, message: "User not found!" });
    }
}

addOwnCourse = async (req, res) => {

    try {

    } catch (error) {

    }

}

addSubscription = async (req, res) => {

    try {

    } catch (error) {

    }

}

addMembership = async (req, res) => {

    try {

    } catch (error) {

    }

}

module.exports = { signup, signin, getUser };
