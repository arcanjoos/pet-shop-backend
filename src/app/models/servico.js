const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const ServicoSchema = new mongoose.Schema({
    descricao: { type: String, require: true, uppercase: true, },
    complemento: { type: String, require: true, uppercase: true, default: '-', },
    valor: { type: Number, require: true, },
    ativo: { type: Boolean, default: true }
});

ServicoSchema.plugin(mongoosePaginate);
const Servico = mongoose.model('Servico', ServicoSchema);

module.exports = Servico;