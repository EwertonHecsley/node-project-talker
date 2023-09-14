const funcoesExtras = require('../utils/functionsExtras');
const knex = require('../conectionBd');

const middlewareAddTalker = (req, res, next) => {
    const { name, age, talk } = req.body;

    if (!name) {
        return res.status(400).json({ mensagem: 'O campo \"name\" é obrigatório' });
    };

    if (name.length < 3) {
        return res.status(400).json({ mensagem: 'O \"name\" deve ter pelo menos 3 caracteres' })
    };

    if (!age) {
        return res.status(400).json({ mensagem: 'O campo \"age\" é obrigatório' });
    };

    if (Number(age) < 18) {
        return res.status(400).json({ mensagem: 'A pessoa palestrante deve ser maior de idade' });
    };

    if (!talk) {
        return res.status(400).json({ mensagem: 'O campo \"talk\" é obrigatório' })
    };

    if (!talk.watchedAt || !talk.rate) {
        return res.status(400).json({ mensagem: 'Todos os campos do Talker devem ser preenchidos' })
    }

    if (!funcoesExtras.dateValidate(talk.watchedAt)) {
        return res.status(400).json({ mensagem: 'O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"' })
    };

    if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({ mensagem: 'O campo \"rate\" deve ser um inteiro de 1 à 5' })
    };

    next()
};

const middlewareDeleteTalker = async (req, res, next) => {
    const { id } = req.params;
    const adm_id = req.usuario.id;

    try {
        const userBd = await knex('talkers').select('*').where({ id, adm_id }).first();

        if (!userBd) {
            return res.status(404).json({ mensagem: 'Talker não encontrado!' })
        }

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { middlewareAddTalker, middlewareDeleteTalker }