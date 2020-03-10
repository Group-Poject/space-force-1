create table patients (
    patient_id serial primary key,
    first_name varchar(150) not null,
    last_name varchar(150) not null,
    email varchar (150) not null,
    password varchar(500) not null,
    phone_number int,
    address varchar(150),
    birth_date varchar(150),
    religious_preference varchar(150),
    blood_type varchar(50)
);

create table contacts (
    contact_id serial primary key,
    email varchar(150),
    password varchar(500),
    patient_id int references patients(patient_id),
    phone_number int,
    has_access boolean
);

create table primary_care_physician (
    provider_id serial primary key,
    patient_id int references patients(patient_id),
    first_name varchar(150),
    last_name varchar(150),
    phone_number int,
    email varchar(150),
    address varchar(150)
);

create table medications (
    medication_id serial primary key,
    patient_id int references patients(patient_id),
    medication_name varchar(250),
    prescription_date varchar(150),
    dose varchar(150),
    frequency varchar(200) 
);

create table allergies (
    allergy_id serial primary key,
    patient_id int references patients(patient_id),
    allergy_name varchar(150),
    allergy_desc varchar(300),
    diagnose_date varchar(150) 
);

create table surgeries (
    surgery_id serial primary key,
    patient_id int references patients(patient_id),
    surgery_name varchar(150),
    surgery_desc varchar(600),
    surgery_date varchar(150)
);

create table family_medical_history (
    fam_med_id serial primary key,
    patient_id int references patients(patient_id),
    patient_relationship varchar(100),
    condition varchar(300),
    condition_desc varchar(600)
);

create table personal_medical_history (
    med_history_id serial primary key,
    patient_id int references patients(patient_id),
    date varchar(150),
    condition varchar(150),
    cond_desc varchar(600)
);

create table appointments (
    appointment_id serial primary key,
    date varchar(150),
    time time,
    appt_desc varchar(600),
    appt_address varchar(300),
    patient_id int references patients(patient_id)
);

create table calendar (
    cal_entry_id serial primary key,
    patient_id int references patients(patient_id),
    medication_id int references medications(medication_id),
    appointment_id int references appointments(appointment_id)
);