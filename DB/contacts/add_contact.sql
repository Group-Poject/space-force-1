insert into contacts (
    email,
    password,
    patient_id,
    phone_number,
    has_access,
    relationship,
    first_name,
    last_name
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8
)
returning *;