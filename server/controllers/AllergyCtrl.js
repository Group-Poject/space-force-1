module.exports={
    getAllergies:(req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db');
        db.allergy.get_allergies(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    addAllergy: (req, res)=>{
        const {id} = req.params;
        const {allergy_name, allergy_desc, diagnose_date} = req.body;
        const db = req.app.get('db');
        db.allergy.add_allergy(id, allergy_name, allergy_desc, diagnose_date)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    editAllergy: (req, res)=>{
        const {id} = req.params;
        const {allergy_name, allergy_desc, diagnose_date} = req.body;
        const db = req.app.get('db')
        db.allergy.edit_allergy(id, allergy_name, allergy_desc, diagnose_date)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    deleteAllergy: (req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db')
        db.allergy.delete_allergy(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}