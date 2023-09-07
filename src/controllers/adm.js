const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../conectionBd');
require('dotenv').config();

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

const login = (req, res) => {
    const { id } = req.usuario;

    const token = jwt.sign({ id }, process.env.KEY_JWT, { expiresIn: '1h' });

    const resposta = {
        mensagem: 'Usuário logado com sucesso',
        usuario: req.usuario,
        token
    };

    return res.status(200).json(resposta)
};

const getAllAdms = async (req_, res) => {
    try {
        const allAdms = await knex('admistrators').select(['id', 'nome', 'email']);

        return res.status(200).json(allAdms)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    cadAdm,
    login,
    getAllAdms
}