import React from 'react';

const Profile = props => {
    
        return(
            <main id='profile-container-main'>
                <div>
                    <p>Name: </p>
                    <p>Email: </p>
                    <p>Password: </p>
                    <p>Birth Date: </p>
                    <p>Phone Number: </p>
                    <p>Address: </p>
                    <p>Blood Type: </p>
                    <p>Religious Preference: </p>
                    <button>Edit</button>
                </div>
                <div>
                    <p>Emergency Contacts</p>
                    <div className='e-contact-card'>
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Relationship:</p>
                    </div>
                    <div className='e-contact-card'>
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Relationship:</p>
                    </div>
                    <div className='e-contact-card'>
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Relationship:</p>
                    </div>
                    <div className='e-contact-card'>
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Relationship:</p>
                    </div>
                </div>
            </main>
        )
    }

    export default Profile; 