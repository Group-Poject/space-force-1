insert into appointments (
    date,
    time,
    appt_desc,
    appt_address,
    patient_id
) values (
    $1,
    $2,
    $3,
    $4,
    $5
) returning *;