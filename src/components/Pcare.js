import React, {useState} from 'react';
import axios from 'axios';
import {useInputValue} from '../hooks/useInputValue'

const PCare = props => {
    const {showAdd, setShowAdd} = useState(false)
    const {primary, setPrimary} = useState({})
    const firstName = useInputValue('')
    const lastName = useInputValue('')
    const number = useInputValue(0)
    const email = useInputValue('')
    const address = useInputValue('')


    addProvider = (patientId, firstName, lastName, phoneNumber, email, address) => {
        axios.post('/api/provider', {patientId, firstName, lastName, phoneNumber, email, address}).then(res => {
            setPrimary(res.data)
        }).catch(err => console.log(err))
    }
    
        return(
            <main>
                <button onClick={setShowAdd(!showAdd)} >Add Provider</button>
                <div>name | address| etc</div>
                <div>map</div>
                {showAdd && (
                    <div>
                        <input
                        placeholder='First Name'
                        type='text'
                        value={firstName}
                        onChange={...firstName}
                        />
                        <input
                        placeholder='Last Name'
                        type='text'
                        value={lastName}
                        onChange={...lastName}
                        />
                        <input
                        placeholder='Phone Number'
                        type='number'
                        value={number}
                        onChange={...number}
                        />
                        <input
                        placeholder='Email'
                        type='email'
                        value={email}
                        onChange={...email}
                        />
                        <input
                        placeholder='address'
                        type='text'
                        value={address}
                        onChange={...address}
                        />
                        <button>Submit</button>
                    </div>
                )}
            </main>
        )
    }

    export default PCare; 