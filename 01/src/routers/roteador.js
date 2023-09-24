const {Router} = require ('express')
const rota = Router()

const controlador = require('../controllers/controladores')
const intermediario = require('../middleware/intermediarios')

rota.post('/autor', intermediario.nome, controlador.cadastrarUsuario)
rota.get('/autor/:id', controlador.buscarPorId)

module.exports = rota