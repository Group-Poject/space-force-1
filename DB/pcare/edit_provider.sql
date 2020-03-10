update primary_care_physician
set first_name = $2,
    last_name = $3,
    phone_number = $4,
    email = $5,
    address = $6
where provider_id = $1;