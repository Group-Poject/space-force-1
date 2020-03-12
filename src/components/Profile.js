import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../redux/userReducer';

const Profile = props => {
    const [profile_list, setProfileList]=useState([]);
    const [contacts_list, setContactsList]=useState([]);

    const getProfile = () => 
    axios.get(`/api/profile${props.user.patient_id}`)
    .then(results => setProfileList(results.data))
    .catch(err => console.log(err));

    const getContacts = () => 
    axios.get(`/api/contacts${props.user.patient_id}`)
    .then(results => setContactsList(results.data))
    .catch(err => console.log(err));

    useEffect(() => {
        getProfile();
        getContacts();
    }, [])
    
        return(
            <main id='profile-container-main'>

                {profile_list.map((e, i) => (
                    <div key={i}>
                        <p>Profile</p>
                        <p>Name: {e.first_name} {e.last_name}</p>
                        <p>Email: {e.email}</p>
                        <p>Phone number: {e.phone_number}</p>
                        <p>Address: {e.address}</p>
                        <p>Birth date: {e.birth_date}</p>
                        <p>Blood type: {e.blood_type}</p>
                        <p>Religious preference: {e.religious_preference}</p>
                        <button>Edit</button>
                    </div>
                ))};

                {contacts_list.map((e, i) => (
                    <div key={i}>
                        <p>Emergency contacts</p>
                        <p>Name: {e.first_name} {e.last_name}</p>
                        <p>Email: {e.email}</p>
                        <p>Phone number: {e.phone_number}</p>
                        <p>Relationship to patient: {e.relationship}</p>
                    </div>
                ))};

            </main>
        )
    }

    const mapStateToProps = state => {
        return state
    }
    
    export default connect(mapStateToProps, {getUser})(Profile);