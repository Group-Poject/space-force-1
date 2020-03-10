update appointments
set date = $2,
    time = $3,
    desc = $4,
    appt_address = $5
where appointment_id = $1;