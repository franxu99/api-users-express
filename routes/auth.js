const {Router} = require('express')
const agenda = require('../agenda.json')
const authByEmailPsw = require('../helpers/check-email-password.js')
const authRouter = Router()

//Endpoint público (No autenticado y no autorizado)
authRouter.get("/public", (req, res) => res.send("Endpoint Público"))

//Endpoint autenticado
authRouter.post("/authenticated", (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.sendStatus(400)

    try{
        const user = authByEmailPsw(email, password);
    
        return res.send(`Autenticado el usuario ${user.name}`)
    }catch(err){
        return res.sendStatus(401)
    }  
})

//Endpoint autorizado
authRouter.post("/authorized", (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.sendStatus(400)

    try{
        const user = authByEmailPsw(email, password);
    
        if(email === user.email && password === user.password) {
            if(user.role !== "admin") return res.status(403)
            return res.send(`Administrador logeado ${user.name}`)   
        }
    }catch(err){
        return res.sendStatus(401)
    }

    res.send()
})


module.exports = authRouter;