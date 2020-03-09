update surgeries 
set surgery_name = $2,
    surgery_desc = $3,
    surgery_date = $4
where surgery_id = $1;