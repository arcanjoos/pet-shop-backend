const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const VacinaSchema = new mongoose.Schema({
    nome: { type: String, require: true, uppercase: true, },
    utilidade: { type: String, require: true, uppercase: true, },
    dataValidade: { type: String, require: true, uppercase: true, },
    ativo: { type: Boolean, default: true }
});
 
VacinaSchema.plugin(mongoosePaginate);
const Vacina = mongoose.model('Vacina', VacinaSchema);

module.exports = Vacina;