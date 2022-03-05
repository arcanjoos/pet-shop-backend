const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const AgendamentoSchema = new mongoose.Schema({
    animal: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Animal', },
    veterinario: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Usuario', },
    servico: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Servico', },
    data: { type: String, require: true, uppercase: true, },
    horario: { type: String, require: true, uppercase: true, },
    ativo: { type: Boolean, default: true }
});

AgendamentoSchema.plugin(mongoosePaginate);
const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);

module.exports = Agendamento;