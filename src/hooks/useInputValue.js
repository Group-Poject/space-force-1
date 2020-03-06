import { useState } from "react";

export const useInputValue = initialValue => {
  const [values, setValues] = useState(initialValue);
   return [values, (e) => {
     setValues({
       ...values,
       [e.target.name]: e.target.value
     })
    }]
  }