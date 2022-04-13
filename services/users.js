const bcrypt = require("bcrypt");

const User = require("../models/users");
const {
    loginValidation,
    registerValidation,
} = require("../utils/inputValidation");


async function registerUser(userData) {
    const { value: data, error } = registerValidation.validate(userData);
    if (error) throw new Error(error.details[0].message);

    const userCount = await User.find({ username: data.username }).count();
    if (userCount > 0) throw new Error(`username "${data.username}" exists`);

    const emailCount = await User.find({ email: data.email }).count();
    if (emailCount > 0) throw new Error(`email "${data.email}" exists`);

    await bcrypt.genSalt(10).then((salt) => {
        data.password = bcrypt.hashSync(data.password, salt);
    });

    await User.create(data).catch((err) => {
        throw new Error("some error occured on server");
    });
}

async function getUser(userData) {
    const { value: data, error } = loginValidation.validate(userData);
    if (error) throw new Error(error.details[0].message);

    const searchData = data.username.includes("@") ? "email" : "username";

    const user = await User.findOne({ [searchData]: data.username });

    if (!user)
        throw new Error(`user not found with ${searchData} ${data.username}`);

    const same = bcrypt.compareSync(data.password, user.password);
    if (!same) throw new Error("wrong password");

    return user;
}

async function getUserById(id) {
    const user = await User.findById(id);
    return user;
}

module.exports = {
    registerUser,
    getUser,
    getUserById
};
