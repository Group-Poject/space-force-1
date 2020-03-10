insert into patients (
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    birth_date,
    religious_preference,
    blood_type
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
)
returning *;