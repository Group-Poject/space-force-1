insert into primary_care_physician (
    patient_id,
    phone_number,
    email,
    address
) values (
    $1,
    $2,
    $3,
    $4
)
returning *;