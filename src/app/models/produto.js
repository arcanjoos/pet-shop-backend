const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, require: true, uppercase: true, },
    descricao: { type: String, require: true, uppercase: true, default: '-', },
    valor: { type: Number, require: true, },
    ativo: { type: Boolean, default: true }
});

ProdutoSchema.plugin(mongoosePaginate);
const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;