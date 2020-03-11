select * from patients
-- contacts on patients.patient_id = contacts.patient_id
where email = $1
-- or contacts.email = $1;