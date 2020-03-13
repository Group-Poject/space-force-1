module.exports={
    getPcare:(req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db');
        db.pcare.get_providers(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    addPcare: (req, res)=>{
        const {id} = req.params;
        const {first_name, last_name, phone_number, email, address} = req.body;
        console.log(req.body)
        const db = req.app.get('db');
        db.pcare.add_provider(id, phone_number,first_name, last_name, email, address)
        .then(data => {
            console.log({data})
            res.status(200).send(data)})
        .catch(err => res.status(500).send(err));
    },

    editPcare: (req, res)=>{
        const {id} = req.params;
        const {first_name, last_name, phone_number, email, address} = req.body;
        const db = req.app.get('db')
        db.pcare.edit_provider(id, first_name, last_name, phone_number, email, address)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },

    deletePcare: (req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db')
        db.pcare.delete_provider(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}