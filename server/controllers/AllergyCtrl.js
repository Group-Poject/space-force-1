let allergies = []

module.exports={
    getAllergies:(req, res)=>{res.status(200).send(allergies)},
    addAllergy: (req, res)=>{
        allergies.push(req.body)
        res.status(200).send(allergies)},
    editAllergy: (req, res)=>{res.status(200).send('edit allergy endpoint')},
    deleteAllergy: (req, res)=>{res.status(200).send('delete allergy endpoint')}
}