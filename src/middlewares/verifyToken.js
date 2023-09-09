require('dotenv').config();
const jwt = require('jsonwebtoken');
const knex = require('../conectionBd');

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    };

    try {
        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.KEY_JWT);

        if (!id) {
            return res.status(401).json({ mensagem: 'Usuário não autorizado' })
        };

        const usuarioBd = await knex('admistrators').select('*').where({ id }).first();

        const { senha: _, ...objUser } = usuarioBd;

        req.usuario = objUser;

        next();

    } catch (error) {
        if (error.message === 'invalid signature') {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado' });
        };

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensagem: 'Tempo excedido, faça login novamente' });
        };
    };
};

module.exports = { verifyToken };