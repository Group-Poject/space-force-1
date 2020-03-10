insert into appointments (
    patient_id,
    date,
    time,
    desc,
    appt_address
) values (
    $1,
    $2,
    $3,
    $4,
    $5
);