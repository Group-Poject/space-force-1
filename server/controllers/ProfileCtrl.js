module.exports = {
    getProfile: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.profile.get_profile(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getContacts: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.contacts.get_contacts(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}