const agenda = require('../agenda.json')

const authByEmailPsw = (email, password) => {
    const user = agenda.find((user) => user.email === email);
    
    if(!user) throw new Error();
    
    if(user.password !== password) throw new Error();

    return user;
}

module.exports = authByEmailPsw;
