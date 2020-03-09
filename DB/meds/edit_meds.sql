update medications
set medication_name = $2,
    prescription_date = $3,
    dose = $4,
    frequency = $5
where medication_id = $1;