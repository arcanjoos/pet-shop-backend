const Animal = require('../models/animal');

module.exports = {

    async cadastrar(req, res) {
        try {
            const { nome, raca, cor, sexo, dataNascimento, dono, } = req.body;
            await Animal.create({ nome, raca, cor, sexo, dataNascimento, dono, });
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async listar(req, res) {
        try {
            const animal = await Animal.find({ ativo: true }).populate('dono');
            return res.send(animal);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },

    async detalhar(req, res) {
        try {
            const { idAnimal } = req.params;
            const animal = await Animal.findById(idAnimal).populate('dono');
            return res.status(200).send(animal);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro  ao visualizar detalhes!' });
        }
    },

    async filtrar(req, res) {
        try {
            const { idAnimal } = req.params;
            const animal = await Animal.find({ ativo: true }).populate('dono');
            return res.send(animal);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },

    async atualizar(req, res) {
        try {
            const { idAnimal } = req.params;
            const animal = await Animal.findByIdAndUpdate(idAnimal, req.body, { new: true });
            await animal.save();
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' });
        }
    },

    async deletar(req, res) {
        try {
            await Animal.findByIdAndRemove(req.params.idAnimal);
            return res.status(200).send({ Sucesso: 'Sucesso!' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },
}