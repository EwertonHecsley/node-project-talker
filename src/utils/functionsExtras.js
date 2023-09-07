const validator = require('validator');


const emailValidator = (email) => {
    const resposta = validator.isEmail(email);

    return resposta
};

module.exports = { emailValidator };