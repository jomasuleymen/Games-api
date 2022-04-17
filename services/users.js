const bcrypt = require("bcrypt");

const User = require("../models/users");
const {
    loginValidation,
    registerValidation,
} = require("../utils/inputValidation");

async function registerUser(userData) {
    const { value: data, error } = registerValidation.validate(userData);
    if (error) throw new Error(error.details[0].message);

    let candidate = await User.findOne({
        $or: [{ username: data.username }, { email: data.email }],
    });
    
    if (candidate) {
        if (candidate.username == data.username)
            throw new Error(`User with username "${data.username}" already exists.`);
        else
            throw new Error(`User with email "${data.email}" already exists.`);
    }

    await bcrypt.genSalt(10).then((salt) => {
        data.password = bcrypt.hashSync(data.password, salt);
    });

    await User.create(data).catch((err) => {
        console.log(err);
        throw new Error("some error occured on the server");
    });
}

async function getUser(data) {
    const { value: userData, error } = loginValidation.validate(data);
    if (error) throw new Error(error.details[0].message);

    const searchBy = userData.username.includes("@") ? "email" : "username";

    const user = await User.findOne({ [searchBy]: userData.username });

    if (!user)
        throw new Error(`User not found with ${searchBy} ${userData.username}`);

    const isPassValid = bcrypt.compareSync(userData.password, user.password);
    if (!isPassValid) throw new Error("Invalid password");

    return user;
}

async function getUserById(id) {
    const user = await User.findById(id);
    return user;
}

module.exports = {
    registerUser,
    getUser,
    getUserById,
};
