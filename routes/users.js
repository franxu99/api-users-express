const express = require('express')
const agenda = require('../agenda.json')
const userRouter = express.Router();

// Agregar middleware para analizar el body de la solicitud en formato JSON
userRouter.use(express.json())

//Endpoints 

//Obtener todo los usuarios
userRouter.get('/users', (req, res) => {
    console.log('Method get route /users')
    res.send(agenda)
});

//Obtener detalles de un usuario
userRouter.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = agenda.find((user) => user.id == id)   //Pongo doble igual por que req es string y en agenda es integer
    if(!user) return res.status(404).send(''); //Error 404 (No encontrado)

    return res.send(user)

});

//Crear usuario
userRouter.post('/users', (req, res) => {
    const {id, name, phone} = req.body

    if(!id || !name) return res.status(400).send()  //Validamos que tenemos los datos

    const user = agenda.find((user) => user.id == id)
    if(user) return res.status(409).send();     //Ya hay un user con este id (Error 409)

    agenda.push({
        id,
        name,
        phone
    })

    return res.send()
});

//Actualizar usuario
userRouter.patch('/users', (req, res) => {
    const {id, name, number} = req.body
    
    if(!name && !number) res.status(400).send()

    const user = agenda.find((user) => user.id == id)

    if(!user) return res.status(409).send()

    user.name = name;
    user.number = number;


    return res.send()
})

//Eliminar usuario 
userRouter.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const userIndex = agenda.findIndex((user) => user.id == id)   //Pongo doble igual por que req es string y en agenda es integer
    if(!userIndex) return res.status(404).send(''); //Error 404 (No encontrado)

    agenda.splice(userIndex, 1);

    return res.send(agenda)
});




module.exports = userRouter;