let medicines = []

module.exports={
    getMedicines:(req, res)=>{
        const db = req.app.get('db');
        db.meds.get_meds()
        
        res.status(200).send(medicines)},

    addMedicine: (req, res)=>{
        const db = req.app.get('db');
        db.meds.add_med()

        medicines.push(req.body)
        res.status(200).send(medicines)},

    editMedicine: (req, res)=>{
        const db = req.app.get('db');
        const {id} = req.params
        db.meds.edit_meds(id)
        
        res.status(200).send('edit med endpoint')},

    deleteMedicine: (req, res)=>{
        const db = req.app.get('db');
        const {id} = req.params
        db.meds.delete_med(id)
        
        res.status(200).send('delete med endpoint')}
}