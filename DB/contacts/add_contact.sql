insert into contacts (
    email,
    password,
    patient_id,
    phone_number,
    has_access,
    relationship
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)
returning *;