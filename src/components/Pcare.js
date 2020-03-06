import React, { useState } from "react";
import axios from "axios";
import { useInputValue } from "../hooks/useInputValue";

const PCare = props => {
  const { showAdd, setShowAdd } = useState(false);
  const { primary, setPrimary } = useState({});
  const [
    { firstName, lastName, number, email, address },
    setValues
  ] = useInputValue({
    firstName: "",
    lastName: "",
    number: 0,
    email: "",
    address: ""
  });

  addProvider = (
    patientId,
    firstName,
    lastName,
    phoneNumber,
    email,
    address
  ) => {
    axios
      .post("/api/provider", {
        patientId,
        firstName,
        lastName,
        phoneNumber,
        email,
        address
      })
      .then(res => {
        setPrimary(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <main>
      <button onClick={setShowAdd(!showAdd)}>Add Provider</button>
      <div>name | address| etc</div>
      <div>map</div>
      {showAdd && (
        <div>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={setValues}
          />
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={setValues}
          />
          <input
            placeholder="Phone Number"
            type="number"
            value={number}
            onChange={setValues}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={setValues}
          />
          <input
            placeholder="address"
            type="text"
            value={address}
            onChange={setValues}
          />
          <button onClick={} >Submit</button>
        </div>
      )}
    </main>
  );
};

export default PCare;
