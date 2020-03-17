module.exports = {
    addAppointment: (req, res) => {
        const {id} = req.params;
        const {dateInput, timeInput, descriptionInput, addressInput} = req.body;
        const db = req.app.get('db');
        db.calendar.add_appointment(dateInput, timeInput, descriptionInput, addressInput, id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    },
    getAppointments: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.calendar.get_events(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
    }
}