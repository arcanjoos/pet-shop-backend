const express = require('express');
const router = express.Router();

// IMPORTANDO OS CONTROLLERS
const agendamentoController = require('./app/controllers/agendamentoController');
const animalController = require('./app/controllers/animalController');
const autenticacaoController = require('./app/controllers/autenticacaoController'); 
const servicoController = require('./app/controllers/servicoController');
const vacinaController = require('./app/controllers/vacinaController');

function index(req, res) { res.send('OK') }


router.get('/', index)

{ // ROTAS DE AUTENTICAÇÃO
    router.post('/usuario/cadastrar', autenticacaoController.cadastrar);
    router.post('/usuario/entrar', autenticacaoController.entrar);
    // router.post('/usuario/esqueci_senha', autenticacaoController.esqueciSenha);
    // router.post('/usuario/redefinir_senha', autenticacaoController.redefinirSenha);
    router.get('/usuario/listar', autenticacaoController.listar);
    router.get('/usuario/filtrar/:tipoUsuario', autenticacaoController.filtrar);
    router.get('/usuario/detalhar/:idUsuario', autenticacaoController.detalhar);
    router.delete('/usuario/excluir/:idUsuario', autenticacaoController.deletar);
}

{ // ROTAS DE AGENDAMENTO
    router.post('/agendamento/cadastrar', agendamentoController.cadastrar);
    router.get('/agendamento/listar', agendamentoController.listar);
    router.get('/agendamento/detalhar/:idAgendamento', agendamentoController.detalhar);
    router.put('/agendamento/atualizar/:idAgendamento', agendamentoController.atualizar);
    router.put('/agendamento/excluir/:idAgendamento', agendamentoController.atualizar);
}

{ // ROTAS DE ANIMAL
    router.post('/animal/cadastrar', animalController.cadastrar);
    router.get('/animal/listar', animalController.listar);
    router.get('/animal/detalhar/:idAnimal', animalController.detalhar);
    router.put('/animal/atualizar/:idAnimal', animalController.atualizar);
    router.put('/animal/excluir/:idAnimal', animalController.atualizar);
}

{ // ROTAS DE SERVIÇO
    router.post('/servico/cadastrar', servicoController.cadastrar);
    router.get('/servico/listar', servicoController.listar);
    router.get('/servico/detalhar/:idServico', servicoController.detalhar);
    router.put('/servico/atualizar/:idServico', servicoController.atualizar);
    router.put('/servico/excluir/:idServico', servicoController.atualizar);
}

{ // ROTAS DE VACINA
    router.post('/vacina/cadastrar', vacinaController.cadastrar);
    router.get('/vacina/listar', vacinaController.listar);
    router.get('/vacina/detalhar/:idVacina', vacinaController.detalhar);
    router.put('/vacina/atualizar/:idVacina', vacinaController.atualizar);
    router.put('/vacina/excluir/:idVacina', vacinaController.atualizar);
}


module.exports = router;