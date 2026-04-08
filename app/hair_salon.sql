-- PostgreSQL adatbázis export javított verzió
-- Projekt: Fodrász Szalon Időpontfoglaló

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Táblák törlése az újratöltéshez (Clean start)
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.hairdresser_services CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.hairdressers CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Users tábla
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    user_name character varying(45) NOT NULL,
    user_email character varying(45) NOT NULL UNIQUE,
    password_hash text NOT NULL,
    user_role character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Hairdressers tábla
CREATE TABLE public.hairdressers (
    id SERIAL PRIMARY KEY,
    hairdresser_name character varying(255) NOT NULL,
    hairdresser_phone_number text,
    hairdresser_email_address text,
    work_start_time time without time zone NOT NULL,
    work_end_time time without time zone NOT NULL,
    profile_image text
);

-- Services tábla
CREATE TABLE public.services (
    id SERIAL PRIMARY KEY,
    service_name character varying(100) NOT NULL,
    service_price numeric(10,2) NOT NULL
);

-- Hairdresser_services (kapcsolótábla)
CREATE TABLE public.hairdresser_services (
    id SERIAL PRIMARY KEY,
    hairdresser_id integer REFERENCES public.hairdressers(id) ON DELETE CASCADE,
    service_id integer REFERENCES public.services(id) ON DELETE CASCADE,
    UNIQUE (hairdresser_id, service_id)
);

-- Appointments tábla
CREATE TABLE public.appointments (
    id SERIAL PRIMARY KEY,
    hairdresser_id integer REFERENCES public.hairdressers(id) ON DELETE CASCADE,
    customer_name character varying(100) NOT NULL,
    customer_phone character varying(20) NOT NULL,
    appointment_date timestamp without time zone NOT NULL,
    service character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (hairdresser_id, appointment_date)
);

-- ADATOK BETÖLTÉSE

-- Felhasználó: admin@example.com | Jelszó: admin123 (bcrypt hash)
INSERT INTO public.users (id, user_name, user_email, password_hash, user_role) VALUES
(1, 'Admin Felhasználó', 'admin@example.com', '$2b$10$cU0dDjakbZOauoJ8rqTs3OpE6PDbkZqJ9zv8yQRc4qYRmSFPkWnQu', 'admin');

-- Fodrászok
INSERT INTO public.hairdressers (id, hairdresser_name, hairdresser_phone_number, hairdresser_email_address, work_start_time, work_end_time, profile_image) VALUES
(1, 'Kiss Ádám', '+36202134567', 'adamkiss@example.com', '09:00:00', '17:00:00', '/assets/images/hairdresser1.jpg'),
(2, 'Sándor Szilvia', '+36203136347', 'szilvisandor@example.com', '08:00:00', '15:00:00', '/assets/images/hairdresser2.jpg'),
(3, 'Hegedűs Árpád', '+36303136377', 'hegearpad@example.com', '10:00:00', '18:00:00', '/assets/images/hairdresser1.jpg'),
(4, 'Pap Zsigmond', '+36701987344', 'papzsigmond@example.com', '08:00:00', '14:00:00', '/assets/images/hairdresser1.jpg'),
(5, 'Gál Orsolya', '+36706747113', 'orsigal@example.com', '10:00:00', '17:00:00', '/assets/images/hairdresser2.jpg'),
(6, 'Hajdu Vivien', '+36209675342', 'vivihajdu@example.com', '09:00:00', '16:00:00', '/assets/images/hairdresser2.jpg'),
(7, 'Balla Csongor', '+36307645675', 'ballacsongor@example.com', '10:00:00', '18:00:00', '/assets/images/hairdresser1.jpg');

-- Szolgáltatások
INSERT INTO public.services (id, service_name, service_price) VALUES
(1, 'hajvágás', 4000.00),
(2, 'hajfestés', 5500.00),
(3, 'borotválás', 4500.00),
(4, 'hajformázás', 5000.00),
(5, 'szakáll igazítás', 3500.00),
(6, 'hajmosás', 3000.00),
(7, 'dauerolás', 5600.00);

-- Fodrász-szolgáltatás kapcsolatok
INSERT INTO public.hairdresser_services (id, hairdresser_id, service_id) VALUES
(1, 1, 1), (2, 1, 3), (3, 1, 4), (4, 1, 5), (5, 2, 1), (6, 2, 2), (7, 2, 7), 
(8, 3, 3), (9, 3, 5), (10, 4, 1), (11, 4, 7), (12, 5, 1), (13, 5, 2), (14, 5, 3), 
(15, 5, 4), (16, 5, 6), (17, 6, 1), (18, 6, 4), (19, 6, 6), (20, 7, 1), (21, 7, 2), (22, 7, 4);

-- Példa foglalás
INSERT INTO public.appointments (id, hairdresser_id, customer_name, customer_phone, appointment_date, service) VALUES
(1, 1, 'Nagy Éva', '+36302345115', '2025-09-15 13:30:00', 'hajformázás');

-- Sorszámlálók (Sequences) frissítése, hogy az új ID-k ne ütközzenek
SELECT pg_catalog.setval('public.appointments_id_seq', 1, true);
SELECT pg_catalog.setval('public.hairdresser_services_id_seq', 22, true);
SELECT pg_catalog.setval('public.hairdressers_id_seq', 7, true);
SELECT pg_catalog.setval('public.services_id_seq', 7, true);
SELECT pg_catalog.setval('public.users_id_seq', 1, true);