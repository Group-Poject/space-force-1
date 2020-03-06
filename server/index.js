require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      ac = require('./controllers/AuthCtrl'),
      AllergyCtrl=require('./controllers/AllergyCtrl'),
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