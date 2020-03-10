let surgeries = []

module.exports={
    getSurgeries:(req, res)=>{
        const db = req.app.get('db');
        db.surgeries.get_surgeries()
        
        res.status(200).send(surgeries)},

    addSurgery: (req, res)=>{
        const db = req.app.get('db');
        db.surgeries.add_surgery()

        surgeries.push(req.body)
        res.status(200).send(surgeries)},

    editSurgery: (req, res)=>{
        const db = req.app.get('db');
        const {id} = req.params
        db.surgeries.edit_surgery(id)
        
        res.status(200).send('edit surgery endpoint')},
        
    deleteSurgery: (req, res)=>{
        const db = req.app.get('db');
        const {id} = req.params
        db.surgeries.delete_surgery(id)
        
        res.status(200).send('delete surgery endpoint')}
}