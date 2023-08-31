const express = require('express')
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth');
//Inicializamos express
const expressApp = express();
//Pedimos un puerto, sino escogemos el 3001
const port = process.env.PORT ?? 3001

// Agregar middleware para analizar el body de la solicitud en formato JSON
expressApp.use(express.json())
expressApp.use(express.text())

//Routes
expressApp.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
expressApp.use(usersRouter)
expressApp.use(authRouter)


expressApp.get('/', (req, res) => {
    res.send('<h1>Esta es mi página</h1>')
})

expressApp.listen(port, () => {
    console.log(`listening proyect on port http://localhost:${port}`)
})
