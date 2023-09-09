const validator = require('validator');
const { isValid, format, parse } = require('date-fns')


const emailValidator = (email) => {
    const resposta = validator.isEmail(email);

    return resposta
};

const dateValidate = (date) => {
    const confgDate = parse(date, 'dd/MM/yyyy', new Date());

    return isValid(confgDate) && format(confgDate, 'dd/MM/yyyy') === date;
};

module.exports = { emailValidator, dateValidate };