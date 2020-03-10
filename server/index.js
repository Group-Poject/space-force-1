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
      app = express(),
      path = require('path'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;


//middleware
app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
    )
    massive(CONNECTION_STRING).then(db => {
        app.set('db', db)
        console.log('DB conncected')
    })
    
    
    //endpoints
    //Allergy endpoints
    app.get('/api/allergies:id', AllergyCtrl.getAllergies)
    app.post('/api/addAllergy:id', AllergyCtrl.addAllergy)
    app.put('/api/editAllergy/:id', AllergyCtrl.editAllergy)
    app.delete('api/deleteAllergy/:id', AllergyCtrl.deleteAllergy)

    //Medicine endpoints
    app.get('/api/medicines:id', MedsCtrl.getMedicines)
    app.post('/api/addMedicine:id', MedsCtrl.addMedicine)
    app.put('/api/editMedicine/:id', MedsCtrl.editMedicine)
    app.delete('/api/deleteMedicine/:id', MedsCtrl.deleteMedicine)

    //Surgery endpoints
    app.get('/api/surgeries:id', SurgeryCtrl.getSurgeries)
    app.post('/api/addSurgery:id', SurgeryCtrl.addSurgery)
    app.put('/api/editSurgery/:id', SurgeryCtrl.editSurgery)
    app.delete('/api/deleteSurgery/:id', SurgeryCtrl.deleteSurgery)

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
    app.get('api/family-history:id', MedHistoryCtrl.getFamHistory);

    //auth
    app.post('/auth/register', ac.register)
    app.post('/auth/login', ac.login)
    app.post('/auth/logout', ac.logout)
    // app.get('/auth/user', ac.getUser)
    
    // app.use(express.static(__dirname + '/../build'))
    // app.get('*', (req,res)=> {
    //     res.sendFile(path.join(__dirname, '../build/index.html'))
    // })
    
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))