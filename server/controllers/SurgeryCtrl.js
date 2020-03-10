module.exports={
    getSurgeries:(req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db');
        db.surgeries.get_surgeries(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    addSurgery: (req, res)=>{
        const {id} = req.params;
        const {surgery_name, surgery_desc, surgery_date} = req.body;
        const db = req.app.get('db');
        db.surgeries.add_surgery(id, surgery_name, surgery_desc, surgery_date)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    editSurgery: (req, res)=>{
        const {id} = req.params;
        const {surgery_name, surgery_desc, surgery_date} = req.body;
        const db = req.app.get('db');
        db.surgeries.edit_surgery(id, surgery_name, surgery_desc, surgery_date)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
        
    deleteSurgery: (req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db');
        db.surgeries.delete_surgery(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}