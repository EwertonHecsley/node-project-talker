const functionsExtras = require('../utils/functionsExtras');
const knex = require('../conectionBd');
const bcrypt = require('bcrypt');

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

const middlewareUpdateAdm = async (req, res, next) => {
    const { nome, email, senha } = req.body;
    const camposPermitidos = ['nome', 'email'];
    const arrBody = Object.keys(req.body);
    const arrValues = Object.values(req.body);

    const verifyKeys = arrBody.every((key) => camposPermitidos.includes(key));

    if (!verifyKeys) {
        return res.status(400).json({ mensagem: 'Somente campos permitidos poderam ser alterados (nome, email, senha)' });
    }

    if (!nome && !email) {
        return res.status(400).json({ mensagem: 'Ao menos um campo deve ser informado' });
    }

    const camposEmBranco = arrBody.filter((key) => arrValues[arrBody.indexOf(key)] === "");

    if (camposEmBranco.length > 0) {
        return res.status(400).json({ mensagem: `Os seguintes campos estão em branco: ${camposEmBranco.join(', ')}` });
    }

    if (email && !functionsExtras.emailValidator(email)) {
        return res.status(400).json({ mensagem: 'Email inválido' });
    }

    try {
        const usuarioBd = await knex('admistrators').select('*');

        if (usuarioBd.some((key) => key.email === email)) {
            return res.status(400).json({ mensagem: 'Email já cadastrado no banco de dados' })
        };

        req.atualizacao = {
            campos: arrBody,
            valores: arrValues
        };

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};


module.exports = {
    middlewareAdm,
    middlewareUpdateAdm
}