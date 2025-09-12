/*
    Főoldal fodrászok kártyák létrehozása az időpontfoglaláshoz és √
        - Modal adatainak lekérdezése, megjelenítése √
*/

import { fetchAppointments } from "./modules/appointmentManaging.js"; // Lefoglalt időpontok kezelése
import { getHairdressers } from "./modules/fetchHairdressersData.js"; // Fodrászok adatainak lekérdezése a kártyákon való megjelenítéshez
import { HairdressersCard } from "./modules/hairdresserCard.class.js"; // Fodrász kártyák kinézete, adatai HairdressersCard class példányosításával
import { imgToHairdressers } from "./modules/functionality/imgDatas.js"; // Fodrászokhoz tartozó képek
import { bookingModal } from "./modules/appointmentModal.js"; 
import { periodsByHairdresser } from "./modules/functionality/timeSlots.js"; // 30 perces idősávok létrehozása

const openModalDatas = bookingModal();

const container = document.querySelector(".flex-container2");

if (container) {

    getHairdressers(imgToHairdressers)
        .then(async datas => {
            const appointments = await fetchAppointments();
            const timeIntervalsForAppointment = {};

        datas.forEach(data => {
            const card = new HairdressersCard(data, container);
            card.renderHairdressers();

            const appointmentButton = card.cardElement.querySelector(".appointment");
            appointmentButton.addEventListener("click", function() {
                const intvals = timeIntervalsForAppointment[data.name];
                openModalDatas(data.name, data.id, data.services, intvals);
            });

            //Radio button
            const name = data.name;
            const workingHours = data.workingHours;
            const periodObject = periodsByHairdresser(name, workingHours);

            timeIntervalsForAppointment[name] = periodObject[name];
            return timeIntervalsForAppointment;
        });
    });
};

/*
    Főoldal árlista generálása √
*/

import { renderPriceTable } from "./modules/renderPriceTable.js"; // Táblázat létrehozása árakkal
import { priceList } from "./modules/functionality/priceList.js"; // Fiktív árak a szolgáltatásokhoz

renderPriceTable(priceList);

/*
    Időpont foglalás
*/

import { validateForm } from "./modules/functionality/formValidate.js"
import { messageModal } from "./modules/messageModal.js";

/*
    Példa adatok

    {
        "hairdresser_id":6,
        "api_key":"prooktatas123",
        "customer_name":"Kiss Éva",
        "customer_phone":"06201234567",
        "appointment_date":"2025-07-08 16:30:00",
        "service":"hajvágás"
    }
*/

const appointBtn = document.querySelector("#appointment-btn");

if (appointBtn) {
    appointBtn.addEventListener("click", async (event) => {

        event.preventDefault();

        // Validáció
        if (!validateForm ()) {
            return;
        }

        const hairdresser_id = Number(document.querySelector("#hairdresser-name").dataset.id);
        const api_key = "prooktatas123";
        const customer_name = document.querySelector(".booking-service #client-name").value.trim();
        const customer_phone = document.querySelector(".booking-service #phone-number").value.trim();
        const dateInput = document.querySelector("#date");
        const timeInput = document.querySelector('input[name="appointment-time"]:checked');
        const appointment_date =  `${dateInput.value} ${timeInput.value}:00`;
        const service = document.querySelector("#service").value;

        
        console.log("hairdresser_id:", hairdresser_id);
        console.log("api_key:", api_key);
        console.log("customer_name:", customer_name);
        console.log("customer_phone:", customer_phone);
        console.log("appointment_date:", appointment_date);
        console.log("service:", service);
        

        console.log(
            JSON.stringify({
                hairdresser_id,
                api_key,
                customer_name,
                customer_phone,
                appointment_date,
                service
            })
        );
        
        try {
            const res = await fetch(`http://salonsapi.prooktatas.hu/api/appointments/${api_key}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    hairdresser_id,
                    api_key,
                    customer_name,
                    customer_phone,
                    appointment_date,
                    service,
                })
            });

            if (res.ok) {
                messageModal("Az időpontfoglalás sikeresen megtörtént.");
            } else if (res.status === 400) {
                messageModal("Nem sikerült az időpontot lefoglalni. Hibás adatok.");
            } else if (res.status === 500) {
                messageModal("Szerverhiba.");
            } else {
                messageModal("Próbáld meg később.");
            }

        } catch (error) {
            console.log(error);
        }

    });
};