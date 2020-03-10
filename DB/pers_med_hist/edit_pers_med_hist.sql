update personal_medical_history
set date = $2,
    condition = $3,
    cond_desc = $4
where med_history_id = $1;