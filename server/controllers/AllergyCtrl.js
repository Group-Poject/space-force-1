let allergies = []

module.exports={
    getAllergies:(req, res)=>{
        const db = req.app.get('db');
        db.allergy.get_allergies()

        res.status(200).send(allergies)},

    addAllergy: (req, res)=>{
        const db = req.app.get('db');
        db.allergy.add_allergy()

        allergies.push(req.body)
        res.status(200).send(allergies)},

    editAllergy: (req, res)=>{
        const db = req.app.get('db')
        const {id} = req.params
        db.allergy.edit_allergy(id)
        
        res.status(200).send('edit allergy endpoint')},

    deleteAllergy: (req, res)=>{
        const db = req.app.get('db')
        const {id} = req.params
        db.allergy.delete_allergy(id)
        
        res.status(200).send('delete allergy endpoint')}
}