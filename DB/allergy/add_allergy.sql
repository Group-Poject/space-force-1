insert into allergies (
    patient_id,
    allergy_name,
    allergy_desc,
    diagnose_date
) values (
    $1,
    $2,
    $3,
    $4
)

returning *;