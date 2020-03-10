update contacts 
set email = $2,
    password = $3,
    phone_number = $4,
    has_access =$5
where contact_id = $1;