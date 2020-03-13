insert into primary_care_physician (
    patient_id,
    phone_number,
    email,
    address,
    first_name,
    last_name
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
);