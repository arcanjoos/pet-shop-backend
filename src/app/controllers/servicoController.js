const Servico = require('../models/servico');

module.exports = {

    async cadastrar(req, res) {
        try {
            const { descricao, complemento, valor, } = req.body;
            await Servico.create({ descricao, complemento, valor });
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async listar(req, res) {
        try {
            const servico = await Servico.find({ ativo: true });
            return res.send(servico);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },

    async detalhar(req, res) {
        try {
            const { idServico } = req.params;
            const servico = await Servico.findById(idServico);
            return res.status(200).send(servico);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async atualizar(req, res) {
        try {
            const { idServico } = req.params;
            const servico = await Servico.findByIdAndUpdate(idServico, req.body, { new: true });
            await servico.save();
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async deletar(req, res) {
        try {
            await Servico.findByIdAndRemove(req.params.idServico);
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },
}