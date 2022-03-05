const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, uppercase: true, },
    email: { type: String, required: true, lowercase: true, unique: true, },
    telefone: { type: String, required: true, uppercase: true, },
    documento: { type: String, required: true, uppercase: true, },
    tipoUsuario: { type: String, required: true, uppercase: true, },
    senha: { type: String, required: true, select: false, },
    tokenRedefinicaoSenha: { type: String, select: false, },
    horarioExpiracaoTokenRedefinicaoSenha: { type: Date, select: false, },
    ativo: { type: Boolean, default: true }
});

UsuarioSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
});

UsuarioSchema.plugin(mongoosePaginate);
const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;


