import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Meds from './components/Meds';
import Pcare from './components/Pcare';
import Allergies from './components/Allergies';
import Calendar from './components/Calendar';
import FRview from './components/FRview';
import MedHistory from './components/MedHistory';
import Surgeries from './components/Surgeries';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/meds' component={Meds} />
        <Route path='/primary-care' component={Pcare} />
        <Route path='/allergies' component={Allergies} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/first-responder' component={FRview} />
        <Route path='/med-history' component={MedHistory} />
        <Route path='/surgeries' component={Surgeries} />
        <Route path='/profile' component={Profile} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
    </Switch>
)