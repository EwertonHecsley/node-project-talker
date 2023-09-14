const knex = require('../conectionBd');
const { format, parse } = require('date-fns');

const AddTalker = async (req, res) => {
    const { name, age } = req.body;
    const { watchedAt, rate } = req.body.talk;
    const { id } = req.usuario;

    const watchedAtDate = parse(watchedAt, 'dd/MM/yyyy', new Date())

    const newWathedAt = format(watchedAtDate, 'yyyy-MM-dd');

    try {
        await knex('talkers').insert({ name, age, rate, watchedat: newWathedAt, adm_id: id });

        const resposta = {
            mensagem: 'Talker Cadastrado com sucesso',
            name,
            age,
            talk: {
                watchedAt,
                rate
            }
        };

        return res.status(201).json(resposta);

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    };
};

const deleteTalker = async (req, res) => {
    const { id } = req.params;

    try {
        await knex('talkers').where({ id }).del()
        return res.status(204).json({ mensagem: 'Talker Deletado' })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
};

const getAllAndFilterTalkers = (req, res) => {
    return res.status(200).json(req.resposta)
}

module.exports = { AddTalker, deleteTalker, getAllAndFilterTalkers }