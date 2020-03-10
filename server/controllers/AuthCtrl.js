const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {first_name, last_name, email, password, phoneNumber, address, birthDate, religiousPreference, bloodType} = req.body,
              db = req.app.get('db'),
              {session} = req;

        let user = await db.user.check_user(email);
        if(user[0]){
            return res.status(400).send('Email already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.user.register_user(first_name, last_name, email, hash, phoneNumber, address, birthDate, religiousPreference, bloodType);

        let sessionUser = {...newUser[0]};
        session.user = sessionUser;
        res.status(201).send(session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body,
              db = req.app.get('db'),
              {session} = req;

        let user = await db.user.check_user(email);
        if(!user[0]){
            return res.status(400).send('User not found')
        }
        const authorized = bcrypt.compareSync(password, user[0].password);
        if(!authorized){
            return res.status(401).send('Incorrect Password')
        }
        delete user[0].password;
        session.user = user[0];
        res.status(202).send(session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}