require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      ac = require('./controllers/AuthCtrl'),
      AllergyCtrl=require('./controllers/AllergyCtrl'),
      MedsCtrl=require('./controllers/MedsCtrl'),
      SurgeryCtrl=require('./controllers/SurgeryCtrl'),
      FRCtrl = require('./controllers/FRCtrl'),
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
    app.get('/api/allergies', AllergyCtrl.getAllergies)
    app.post('/api/addAllergy', AllergyCtrl.addAllergy)
    app.put('/api/editAllergy/:id', AllergyCtrl.editAllergy)
    app.delete('api/deleteAllergy/:id', AllergyCtrl.deleteAllergy)

    //Medicine endpoints
    app.get('/api/medicines', MedsCtrl.getMedicines)
    app.post('/api/addMedicine', MedsCtrl.addMedicine)
    app.put('/api/editMedicine/:id', MedsCtrl.editMedicine)
    app.delete('/api/deleteMedicine/:id', MedsCtrl.deleteMedicine)

    //Surgery endpoints
    app.get('/api/surgeries', SurgeryCtrl.getSurgeries)
    app.post('/api/addSurgery', SurgeryCtrl.addSurgery)
    app.put('/api/editSurgery/:id', SurgeryCtrl.editSurgery)
    app.delete('/api/deleteSurgery/:id', SurgeryCtrl.deleteSurgery)

    //First Responder endpoints
    app.get('/patient-info', FRCtrl.getPatientInfo);
    app.get('/pcare-info', FRCtrl.getPCareInfo);
    app.get('/allergy-info', FRCtrl.getAllergyInfo);
    app.get('/meds-info', FRCtrl.getMedsInfo);
    app.get('/surgery-info', FRCtrl.getSurgeryInfo);
    app.get('/patient-history-info', FRCtrl.getPatientHistory);
    app.get('/fam-history-info', FRCtrl.getFamHistory);

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