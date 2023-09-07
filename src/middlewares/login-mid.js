const bcrypt = require('bcrypt');
const knex = require('../conectionBd');

const verifylogin = async (req, res, next) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' })
    };

    try {
        const findUserBd = await knex('admistrators').select('*').where({ email }).first();

        if (!findUserBd) {
            return res.status(404).json({ mensagem: 'Usuario nao encontrado' })
        };

        const verifySenha = await bcrypt.compare(senha, findUserBd.senha);

        if (!verifySenha) {
            return res.status(404).json({ mensgem: 'Senha invalida' })
        };

        const { senha: _, ...objUser } = findUserBd;

        req.usuario = objUser;

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
};

module.exports = {
    verifylogin
}