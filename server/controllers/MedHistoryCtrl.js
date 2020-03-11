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
    },
    postPersonalHistory: (req, res) => {
        const {id} = req.params;
        const {condition, cond_desc, date} = req.body;
        const db = req.app.get('db');
        db.pers_med_hist.add_pers_med_hist(id, date, condition, cond_desc)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    postFamHistory: (req, res) => {
        const {id} = req.params;
        const {patient_relationship, famCondition, condition_desc} = req.body;
        const db = req.app.get('db');
        db.fam_med_hist.add_fam_med_hist(id, patient_relationship, famCondition, condition_desc)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}