let surgeries = []

module.exports={
    getSurgeries:(req, res)=>{res.status(200).send(surgeries)},
    addSurgery: (req, res)=>{
        surgeries.push(req.body)
        res.status(200).send(surgeries)},
    editSurgery: (req, res)=>{res.status(200).send('edit allergy endpoint')},
    deleteSurgery: (req, res)=>{res.status(200).send('delete allergy endpoint')}
}