const functionsExtras = require('../utils/functionsExtras');
const knex = require('../conectionBd');

const middlewareAdm = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' })
    };

    const verificaEmail = functionsExtras.emailValidator(email);

    if (!verificaEmail) {
        return res.status(400).json({ mensagem: 'Email inválido' })
    };

    const consultaBdEmail = await knex('admistrators').select('email').where({ email }).first();

    if (consultaBdEmail) {
        return res.status(400).json({ mensagem: 'Email já cadastrado' })
    }

    if (senha.length < 6) {
        return res.status(400).json({ mensagem: 'Senha deve ter mínimo 6 caracteres' })
    };

    next();
};

module.exports = {
    middlewareAdm
}