const Vacina = require('../models/vacina');

module.exports = {

    async cadastrar(req, res) {
        try {
            const { nome, utilidade, dataValidade, } = req.body;
            await Vacina.create({ nome, utilidade, dataValidade, });
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async listar(req, res) {
        try {
            const vacina = await Vacina.find({ ativo: true });
            return res.send(vacina);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },

    async detalhar(req, res) {
        try {
            const { idVacina } = req.params;
            const vacina = await Vacina.findById(idVacina);
            return res.status(200).send(vacina);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async atualizar(req, res) {
        try {
            const { idVacina } = req.params;
            const vacina = await Vacina.findByIdAndUpdate(idVacina, req.body, { new: true });
            await vacina.save();
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async deletar(req, res) {
        try {
            await Vacina.findByIdAndRemove(req.params.idVacina);
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },
}