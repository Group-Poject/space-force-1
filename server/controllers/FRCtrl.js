module.exports = {
    getPatientInfo: (req, res) => {
        const db = req.app.get('db');
        db.first_responder.get_patient_info()
        .then(patients => res.status(200).send(patients))
        .catch(err => res.status(500).send(err));
    },
    getPCareInfo: (req, res) => {
        const db = req.app.get('db');
        db.first_responder.get_pcare_info()
        .then(primary_care_physician => res.status(200).send(primary_care_physician))
        .catch(err => res.status(500).send(err));
    },
    getAllergyInfo: (req, res) => {
        const db = req.app.get('db');
        db.first_responder.get_allergy_info()
        .then(allergies => res.status(200).send(allergies))
        .catch(err => res.status(500).send(err));
    },
    getMedsInfo: (req, res) => {
        const db = req.app.get('db');
        db.first_responder.get_meds_info()
        .then(medications => res.status(200).send(medications))
        .catch(err => res.status(500).send(err));
    },
    getSurgeryInfo: (req, res) => {
        const db = req.app.get('db');
        db.first_responder.get_surgery_info()
        .then(surgeries => res.status(200).send(surgeries))
        .catch(err => res.status(500).send(err));
    },
    getPatientHistory: (req, res) => {
        const db = req.app.get('db');
        db.first_responder.get_patient_history()
        .then(personal_medical_history => res.status(200).send(personal_medical_history))
        .catch(err => res.status(500).send(err));
    },
    getFamHistory: (req, res) => {
        const db = req.app.get('db');
        db.first_responder.get_fam_history()
        .then(family_medical_history => res.status(200).send(family_medical_history))
        .catch(err => res.status(500).send(err));
    }
}