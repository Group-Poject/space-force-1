const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        console.log(req.body)
        const {first_name, last_name, email, password, phone_number, address, birth_date, religious_preference, blood_type} = req.body,
              db = req.app.get('db'),
              {session} = req;

        let user = await db.auth.check_user(email);
        if(user[0]){
            return res.status(400).send('Email already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.auth.register_user(first_name, last_name, email, hash, phone_number, address, birth_date, religious_preference, blood_type);
        console.log(newUser)
        let sessionUser = {...newUser[0]};
        session.user = sessionUser;
        res.status(201).send(session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body,
              db = req.app.get('db'),
              {session} = req;

        let user = await db.auth.check_user(email);
        let contact = await db.auth.check_contacts(email);
        let authorized;
        if(!user[0] && !contact[0]){
            return res.status(400).send('User not found')
        }
        if(!user[0] && contact[0]){
            authorized = bcrypt.compareSync(password, contact[0].password);
            if(!authorized){
                return res.status(401).send('Incorrect Password')
            }
            delete contact[0].password;
            session.user = contact[0];
            res.status(202).send(session.user);
        }
        if(user[0] && !contact[0]){
            authorized = bcrypt.compareSync(password, user[0].password);
            if(!authorized){
                return res.status(401).send('Incorrect Password')
            }
            delete user[0].password;
            session.user = user[0];
            res.status(202).send(session.user);
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}