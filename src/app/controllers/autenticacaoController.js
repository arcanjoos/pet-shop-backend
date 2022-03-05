const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { cpf, cnpj } = require('cpf-cnpj-validator');
const phoneFormatter = require('phone-formatter');

const configuracoesAutenticacao = require('../../config/autenticacao');

const Usuario = require('../models/usuario');
const { atualizar } = require('./agendamentoController');

const router = express.Router();

function gerarToken(params = {}) { return jwt.sign(params, configuracoesAutenticacao.secret, { expiresIn: 21600 }) };

module.exports = {

    async cadastrar(req, res) {
        try {
            const { nome, documento, email, telefone, tipoUsuario, senha, } = req.body;
            if (await Usuario.findOne({ email })) { return res.status(400).send({ Erro: 'Usuário já existe' }) }
            const tamanhoTelefone = telefone.length;
            const tamanhoDocumento = documento.length;
            var documentoFormatado = '';
            //VALIDAÇÃO DE TELEFONE
            if (tamanhoTelefone == 10) {
                const telefoneFormatado = phoneFormatter.format(telefone, "(NN) NNNN-NNNN");
                //VALIDAÇÃO DE CPF
                if (tamanhoDocumento == 11) {
                    const validaCPF = cpf.isValid(documento);
                    if (validaCPF == false) { return res.status(400).send({ Erro: 'CPF inválido!\nDigite apenas os números.' }) }
                    else { documentoFormatado = cpf.format(documento); }
                    //VALIDAÇÃO DE CNPJ
                } else if (tamanhoDocumento == 14) {
                    const validaCNPJ = cnpj.isValid(documento);
                    if (validaCNPJ == false) { return res.status(400).send({ Erro: 'CNPJ inválido!\nDigite apenas os números.' }) }
                    else { documentoFormatado = cnpj.format(documento); }
                } else { return res.status(400).send({ Erro: 'CPF/CNPJ inválido!\nDigite apenas os números.' }) }
                await Usuario.create({ nome, email, documento: documentoFormatado, telefone: telefoneFormatado, tipoUsuario, senha, });
                return res.status(200).send({ Sucesso: 'Usuário cadastrado com sucesso' })
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro ao cadastrar usuário' })
        };
    },

    async entrar(req, res) {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ email }).select('+senha');
        if (!usuario) { return res.status(400).send({ Erro: 'Usuário não existe' }); }
        if (!await bcrypt.compare(senha, usuario.senha)) { return res.status(400).send({ Erro: 'Senha inválida' }); }
        usuario.senha = undefined;
        const token = gerarToken();
        res.send({ usuario, token: gerarToken({ id: usuario.id }) });
    },

    async listar(req, res) {
        try {
            const usuario = await Usuario.find({ ativo: true });
            return res.send(usuario);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        };
    },

    async filtrar(req, res) {
        try {
            const { tipoUsuario } = req.params;
            const usuario = await Usuario.find({ tipoUsuario: tipoUsuario, ativo: true });
            return res.send(usuario);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        };
    },

    async detalhar(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.idUsuario);
            return res.send(usuario);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },

    async atualizar(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.idUsuario);
        
        
         } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        }
    },

    async deletar(req, res) {
        try {
            await Usuario.findByIdAndRemove(req.params.idUsuario);
            return res.status(200).send({ Sucesso: 'Sucesso!' })
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro!' })
        };
    },

}


  // async esqueciSenha(req, res) {
     //     try {
     //         const { email } = req.body;
     //         const usuario = await Usuario.findOne({ email });
     //         if (!usuario) { return res.status(400).send({ Erro: 'Usuário não encontrado' }); }
     //         const token = crypto.randomBytes(20).toString('hex');
     //         const horarioExpiracaoToken = new Date();
     //         horarioExpiracaoToken.setHours(horarioExpiracaoToken.getHours() + 1);
     //         await Usuario.findByIdAndUpdate(usuario.id, { '$set': { tokenRedefinicaoSenha: token, horarioExpiracaoTokenRedefinicaoSenha: horarioExpiracaoToken, } });
     //         return res.status(200).send({ 'Token de Redefinição de Senha': token })
     //     } catch (err) {
     //         console.log(err);
     //         res.status(400).send({ Erro: 'Erro ao redefinir a senha, tente novamente' })
     //     };
     // },

     // async redefinirSenha(req, res) {
     //     try {
     //         const { email, token, senha } = req.body;
     //         const usuario = await Usuario.findOne({ email }).select('+tokenRedefinicaoSenha horarioExpiracaoTokenRedefinicaoSenha');
     //         const horarioAtual = new Date();
     //         if (!usuario) { return res.status(400).send({ Erro: 'Usuário não encontrado' }) };
     //         if (token !== usuario.tokenRedefinicaoSenha) { return res.status(400).send({ Erro: 'Token inválido' }) };
     //         if (horarioAtual > usuario.horarioExpiracaoTokenRedefinicaoSenha) { return res.status(400).send({ Erro: 'O token expirou, gere um novo' }) } usuario.senha = senha;
     //         await usuario.save();
     //         res.send({ Resposta: 'Sucesso. Tente fazer login novamente.' });
     //     } catch (err) {
     //         console.log(err);
     //         res.status(400).send({ Erro: 'Não foi possível redefinir a senha, tente novamente ' })
     //     };
     // },  