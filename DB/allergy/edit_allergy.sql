update allergies 
set allergy_name = $2,
    allergy_desc = $3,
    diagnose_date = $4
where allergy_id = $1;