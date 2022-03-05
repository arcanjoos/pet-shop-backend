const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const AnimalSchema = new mongoose.Schema({
    nome: { type: String, require: true, uppercase: true, },
    raca: { type: String, require: true, uppercase: true, },
    cor: { type: String, require: true, uppercase: true, },
    sexo: { type: String, require: true, uppercase: true, },
    dataNascimento: { type: String, require: true, uppercase: true, },
    dono: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Usuario', },
    ativo: { type: Boolean, default: true }
});

AnimalSchema.plugin(mongoosePaginate);
const Animal = mongoose.model('Animal', AnimalSchema);

module.exports = Animal;