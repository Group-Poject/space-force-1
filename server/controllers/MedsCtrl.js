module.exports={
    getMedicines:async(req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db');
        const meds = await db.meds.get_meds(id)
        .then(meds => res.status(200).send(meds))
        .catch(err => res.status(500).send(err));
    },

    addMedicine: (req, res)=>{
        const {id} = req.params;
        const {medication_name, prescription_date, dose} = req.body;
        const db = req.app.get('db');
        db.meds.add_med(id, medication_name, prescription_date, dose)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    editMedicine: (req, res)=>{
        const {id} = req.params;
        const {medication_name, prescription_date, dose} = req.body;
        const db = req.app.get('db');
        db.meds.edit_meds(id, medication_name, prescription_date, dose)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    deleteMedicine: (req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db');
        db.meds.delete_med(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}