module.exports = {
    getPatientInfo: (req, res) => {
        const {patient_id} = req.params;
        const db = req.app.get('db');
        db.first_responder.get_patient_info(patient_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getPCareInfo: (req, res) => {
        const {patient_id} = req.params;
        const db = req.app.get('db');
        db.first_responder.get_pcare_info(patient_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getAllergyInfo: (req, res) => {
        const {patient_id} = req.params;
        const db = req.app.get('db');
        db.first_responder.get_allergy_info(patient_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getMedsInfo: (req, res) => {
        const {patient_id} = req.params;
        const db = req.app.get('db');
        db.first_responder.get_meds_info(patient_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getSurgeryInfo: (req, res) => {
        const {patient_id} = req.params;
        const db = req.app.get('db');
        db.first_responder.get_surgery_info(patient_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getPatientHistory: (req, res) => {
        const {patient_id} = req.params;
        const db = req.app.get('db');
        db.first_responder.get_patient_history(patient_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getFamHistory: (req, res) => {
        const {patient_id} = req.params;
        const db = req.app.get('db');
        db.first_responder.get_fam_history(patient_id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}