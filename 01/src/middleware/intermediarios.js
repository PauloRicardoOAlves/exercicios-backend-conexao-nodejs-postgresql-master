const pool = require('../conection/conexao')

function nome(req, res, next) {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ mensagem: 'o campo nome é obrigatório.' })
    }

    next()
}



module.exports = {
    nome,

}