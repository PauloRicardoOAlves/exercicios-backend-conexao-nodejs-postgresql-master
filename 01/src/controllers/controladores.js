
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

    try {
        const query = `select * from autores where id = $1`
        const params = [id]

        const retorno = await pool.query(query, params)

        if (!retorno.rowCount) {
            return res.status(400).json({ mensagem: "Autor não encontrado" })
        }
        const resultado = retorno.rows

        const query2 = `select * from livros where autor_id = $1`
        const params2 = [id]

        const result = await pool.query(query2, params2)
        const livros = result.rows

    } catch (error) {
        console.log(error.message)
    }
}

async function cadastrarLivro(req, res) {
    const { nome, genero, editora, data_publicacao } = req.body
    const { id } = req.params

    try {
        const query = `insert into livros
    (nome, genero, editora, data_publicacao, autor_id)
    values
    ($1, $2, $3, $4, $5)`

        const params = [nome, genero, editora, data_publicacao, id]

        const resultado = await pool.query(query, params)

        const queryRetorno = `select * from livros where id = $1`
        const paramsRetorno = [id]

        const retorno = await pool.query(queryRetorno, paramsRetorno)
        const { rows } = retorno

        res.json({ rows })

    } catch (error) {
        console.log(error.message)
    }


}

module.exports = {
    cadastrarUsuario,
    buscarPorId,
    cadastrarLivro
}