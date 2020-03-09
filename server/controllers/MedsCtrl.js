let medicines = []

module.exports={
    getMedicines:(req, res)=>{res.status(200).send(medicines)},
    addMedicine: (req, res)=>{
        medicines.push(req.body)
        res.status(200).send(medicines)},
    editMedicine: (req, res)=>{res.status(200).send('edit allergy endpoint')},
    deleteMedicine: (req, res)=>{res.status(200).send('delete allergy endpoint')}
}