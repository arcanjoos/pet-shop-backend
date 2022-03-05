const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const FinanceiroSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', require: true, },
    servico: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servico', }],
    produto: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produto', }],
    total: { type: Number, },
    ativo: { type: Boolean, default: true }
});

FinanceiroSchema.plugin(mongoosePaginate);
const Financeiro = mongoose.model('Financeiro', FinanceiroSchema);

module.exports = Financeiro;