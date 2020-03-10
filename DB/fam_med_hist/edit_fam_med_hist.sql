update family_medical_history
set patient_relationship = $2,
    condition = $3,
    cond_desc = $4
where fam_med_id = $1;