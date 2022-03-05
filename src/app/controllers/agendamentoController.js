const Agendamento = require('../models/agendamento');
const Animal = require('../models/animal');

module.exports = {

    async cadastrar(req, res) {
        try {
            const { animal, veterinario, servico, data, horario, } = req.body;
            const buscaCliente = await Animal.findById(animal).populate('dono');
            const cliente = buscaCliente.dono._id;
            await Agendamento.create({ animal, veterinario, servico, data, horario, cliente });
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async listar(req, res) {
        try {
            const agendamento = await Agendamento.find({ ativo: true }).populate(['animal', 'veterinario', 'servico']);
            return res.send(agendamento);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },

    async detalhar(req, res) {
        try {
            const { idAgendamento } = req.params;
            const agendamento = await Agendamento.findById(idAgendamento).populate(['animal', 'veterinario', 'servico']);
            return res.status(200).send(agendamento);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async atualizar(req, res) {
        try {
            const { idAgendamento } = req.params;
            const agendamento = await Agendamento.findByIdAndUpdate(idAgendamento, req.body, { new: true });
            await agendamento.save();
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async deletar(req, res) {
        try {
            await Agendamento.findByIdAndRemove(req.params.idAgendamento);
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },

}