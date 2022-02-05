const bcrypt = require("bcryptjs");

const comparePassword = async (password, hashedPassword) => {
    const results = await bcrypt.compare(password, hashedPassword);
    return results;
};
module.exports = comparePassword;