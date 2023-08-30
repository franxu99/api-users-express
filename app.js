const express = require('express')
const agendaJSON = require('./agenda.json');
const users = require('./routes/users.js')
//Inicializamos express
const app = express();
//Pedimos un puerto, sino escogemos el 3001
const port = process.env.PORT ?? 3001

app.use(users)

app.get('/', (req, res) => {
    res.send('<h1>Esta es mi página</h1>')
})

app.get('/info', (req, res) => {
    const date = Date()
    res.send(
        `<h1>Phonebook has info for ${agendaJSON.length} people</h1>
        <h2>${date}</h2>
        `
    )
})

//Ruta de las agendas
app.get('/api/persons', (req, res) => {
    res.json(agendaJSON)
})

app.listen(port, () => {
    console.log(`listening proyect on port http://localhost:${port}`)
})
