
const pool = require('../conection/conexao')

async function cadastrarUsuario(req, res) {
    const { nome, idade } = req.body

    try {
        const query = `insert into autores 
        (nome, idade)
        values
        ($1, $2)`

        const params = [nome, idade]

        await pool.query(query, [nome, idade])

        const queryRetorno = `select * from autores where nome = $1`
        const paramsRetorno = [nome]

        const resultado = await pool.query(queryRetorno, paramsRetorno)
        const retorno = resultado.rows

        res.status(201).json({ retorno })
    } catch (error) {
        console.log(error.message)
    }
}

async function buscarPorId(req, res) {
    const { id } = req.params

    const query = `select * from autores where id = $1`
    const params = [id]

    const retorno = await pool.query(query, params)

    if (!retorno.rowCount) {
        return res.status(400).json({ mensagem: "Autor não encontrado" })
    }
    const resultado = retorno.rows

    res.status(200).json({ resultado })
}

module.exports = {
    cadastrarUsuario,
    buscarPorId
}