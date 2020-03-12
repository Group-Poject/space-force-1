const bcrypt = require('bcryptjs')

module.exports = {
  getContacts: (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.contacts
      .get_contacts(id)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send(err));
  },

  addContact: (req, res) => {
    const { id } = req.params;
    const { email, password, phone_number, has_access, relationship } = req.body;
    const db = req.app.get("db");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    db.contacts
      .add_contact(email, hash, id, phone_number, has_access, relationship)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send(err));
  },

  editContact: (req, res) => {
    const { id } = req.params;
    const { email, password, phone_number, has_access, relationship } = req.body;
    const db = req.app.get("db");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    db.contacts
      .edit_contacts(email, hash, id, phone_number, has_access, relationship)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send(err));
  },

  deleteContact: (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.contacts
      .delete_contact(id)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send(err));
  }
};
