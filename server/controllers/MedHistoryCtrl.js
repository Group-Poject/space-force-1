module.exports = {
    getPersonalHistory: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.pers_med_hist(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getFamHistory: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.fam_med_hist(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}