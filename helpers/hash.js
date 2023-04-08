const bcrypt = require('bcryptjs');



function hashPasword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password,hash) {
    return bcrypt.compareSync(password,hash);
}

module.exports = {
    hashPasword,
    comparePassword
}