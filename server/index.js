require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      ac = require('./controllers/AuthCtrl'),
      AllergyCtrl=require('./controllers/AllergyCtrl'),
      MedsCtrl=require('./controllers/MedsCtrl'),
      SurgeryCtrl=require('./controllers/SurgeryCtrl'),
      FRCtrl = require('./controllers/FRCtrl'),
      MedHistoryCtrl = require('./controllers/MedHistoryCtrl'),
      PcareCtrl = require('./controllers/PcareCtrl'),
      contactsCtrl = require('./controllers/contactsCtrl'),
      ProfileCtrl = require('./controllers/ProfileCtrl'),
      CalendarCtrl = require('./controllers/CalendarCtrl'),
      app = express(),
      path = require('path'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;


//middleware
app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000*60*60*60}
    })
    )
    massive(CONNECTION_STRING).then(db => {
        app.set('db', db)
        console.log('DB conncected')
    })
    
    
    //endpoints
    //Calendar endpoints
    app.post('/api/add-appointment:id', CalendarCtrl.addAppointment)
    app.get('/api/get-appointments:id', CalendarCtrl.getAppointments)

    //Allergy endpoints
    app.get('/api/allergies:id', AllergyCtrl.getAllergies)
    app.post('/api/allergy:id', AllergyCtrl.addAllergy)
    app.put('/api/allergy/:id', AllergyCtrl.editAllergy)
    app.delete('/api/allergy/:id', AllergyCtrl.deleteAllergy)

    //Medicine endpoints
    app.get('/api/medicines:id', MedsCtrl.getMedicines)
    app.post('/api/medicine:id', MedsCtrl.addMedicine)
    app.put('/api/medicine/:id', MedsCtrl.editMedicine)
    app.delete('/api/medicine/:id', MedsCtrl.deleteMedicine)

    //Surgery endpoints
    app.get('/api/surgeries:id', SurgeryCtrl.getSurgeries)
    app.post('/api/surgery:id', SurgeryCtrl.addSurgery)
    app.put('/api/surgery/:id', SurgeryCtrl.editSurgery)
    app.delete('/api/surgery/:id', SurgeryCtrl.deleteSurgery)

    //First Responder endpoints
    app.get('/api/patient-info:patient_id', FRCtrl.getPatientInfo);
    app.get('/api/pcare-info:patient_id', FRCtrl.getPCareInfo);
    app.get('/api/allergy-info:patient_id', FRCtrl.getAllergyInfo);
    app.get('/api/meds-info:patient_id', FRCtrl.getMedsInfo);
    app.get('/api/surgery-info:patient_id', FRCtrl.getSurgeryInfo);
    app.get('/api/patient-history-info:patient_id', FRCtrl.getPatientHistory);
    app.get('/api/fam-history-info:patient_id', FRCtrl.getFamHistory);

    //Medical History endpoints
    app.get('/api/personal-history:id', MedHistoryCtrl.getPersonalHistory);
    app.get('api/fam-history:id', MedHistoryCtrl.getFamHistory);
    app.post('/api/add-personal-history:id', MedHistoryCtrl.postPersonalHistory);
    app.post('/api/add-fam-history:id', MedHistoryCtrl.postFamHistory);
    app.delete('/api/personal-history:id', MedHistoryCtrl.deletePersonalHistory);
    app.delete('/api/fam-history:id', MedHistoryCtrl.deleteFamHistory);

    //Profile endpoints
    app.get('/api/profile:id', ProfileCtrl.getProfile);
    app.get('/api/contacts:id', ProfileCtrl.getContacts);

    //auth
    app.post('/auth/register', ac.register)
    app.post('/auth/login', ac.login)
    app.post('/auth/logout', ac.logout)
    // app.get('/auth/user', ac.getUser)

    //contacts
    app.get('/api/contacts:id',  contactsCtrl.getContacts)
    app.post('/api/contacts:id', contactsCtrl.addContact)
    app.put('/api/contacts:id', contactsCtrl.editContact)
    app.delete('/api/contacts:id', contactsCtrl.deleteContact)

    //pcare
    app.get('/api/pcare:id',  PcareCtrl.getPcare)
    app.post('/api/pcare:id', PcareCtrl.addPcare)
    app.put('/api/pcare:id', PcareCtrl.editPcare)
    app.delete('/api/pcare:id', PcareCtrl.deletePcare)
    
    // app.use(express.static(__dirname + '/../build'))
    // app.get('*', (req,res)=> {
    //     res.sendFile(path.join(__dirname, '../build/index.html'))
    // })
    
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))