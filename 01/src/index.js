const express = require('express')
const app = express()

const rota = require('./routers/roteador')

app.use(express.json())

app.use(rota)

app.listen(3000)