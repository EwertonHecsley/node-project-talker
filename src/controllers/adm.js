const bcrypt = require('bcrypt');
const knex = require('../conectionBd');

const cadAdm = async (req, res) => {
    const { nome, email, senha } = req.body;

    const senhaCripted = await bcrypt.hash(senha, 10);

    try {
        const userAdm = await knex('admistrators')
            .insert({ nome, email, senha: senhaCripted })
            .returning(['id', 'nome', 'email']);

        return res.status(201).json({ mensagem: 'Admistrador Cadastrado com sucesso', usuario: userAdm[0] })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
};

module.exports = {
    cadAdm
}