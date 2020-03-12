update contacts 
set email = $2,
    password = $3,
    phone_number = $4,
    has_access =$5,
    relationship = $6,
    first_name = $7,
    last_name = $8
where contact_id = $1;