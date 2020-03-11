insert into medications (patient_id, medication_name, prescription_date, dose) values (
    $1,
    $2,
    $3,
    $4
) 
returning *;
