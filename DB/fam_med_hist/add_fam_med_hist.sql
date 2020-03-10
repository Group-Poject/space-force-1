insert into family_medical_history (
    patient_id,
    patient_ relationship,
    condition,
    cond_desc
) values (
    $1,
    $2,
    $3,
    $4
);