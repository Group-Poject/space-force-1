insert into personal_medical_history (
    patient_id,
    date,
    condition,
    cond_desc
) values (
    $1,
    $2,
    $3,
    $4
);