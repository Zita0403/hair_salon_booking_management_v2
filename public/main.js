console.log("Fő javaScript fájl");

/*
    Navigációs sáv kinézete scrollozásnál √
*/

window.addEventListener('scroll', function(){
    const navigation = document.querySelector("#navigation");
    const navHeight = navigation.offsetHeight;

    if (window.scrollY > navHeight) {
        navigation.classList.remove("transparent");
        navigation.classList.add("solid");
    } else {
        navigation.classList.remove("solid");
        navigation.classList.add("transparent");
    }
});

/*
    Navigáció működése mobil nézetben √
*/

const navToggleBtn = document.querySelector(".toggle-btn");
const navbarIcon = navToggleBtn.querySelector("i")

navToggleBtn.addEventListener("click", function () {
    let dropDownMenu = document.querySelector(".dropdown-menu");
    dropDownMenu.classList.toggle("open");

    if (navbarIcon.classList.contains("fa-bars")) {
        navbarIcon.classList.remove("fa-bars");
        navbarIcon.classList.add("fa-xmark");
    } else {
        navbarIcon.classList.remove("fa-xmark");
        navbarIcon.classList.add("fa-bars");
    }
    
});

/*
    Lap tetejére görgetés
*/ 

const btn = document.querySelector("#top");

window.addEventListener("scroll", () => {
if (window.scrollY > 300) { 
    btn.style.display = "block";
} else {
    btn.style.display = "none";
}
});

btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*
    Főoldal fodrászok kártyák létrehozása az időpontfoglaláshoz és √
        - Modal adatainak lekérdezése, megjelenítése √
*/

import { fetchAppointments } from "/assets/modules/API_communication/appointmentManaging.js"; // Lefoglalt időpontok kezelése
import { getHairdressers } from "/assets/modules/API_communication/fetchHairdressersData.js"; // Fodrászok adatainak lekérdezése a kártyákon való megjelenítéshez
import { HairdressersCard } from "/assets/modules/components/hairdresserCard.class.js"; // Fodrász kártyák kinézete, adatai HairdressersCard class példányosításával
import { bookingModal } from "/assets/modules/components/appointmentModal.js"; 
import { periodsByHairdresser } from "/assets/modules/functionality/timeSlots.js"; // 30 perces idősávok létrehozása

const openModalDatas = bookingModal();

const container = document.querySelector(".flex-container2");

if (container) {

    getHairdressers()
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

import { renderPriceTable } from "/assets/modules/API_communication/renderPriceTable.js"; // Táblázat létrehozása árakkal

renderPriceTable();

/*
    Időpont foglalás
*/

import { validateForm } from "/assets/modules/functionality/formValidate.js"
import { messageModal } from "/assets/modules/components/messageModal.js";

/*
    Példa adatok

    {
        "hairdresser_id":6,
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
        const customer_name = document.querySelector(".booking-service #client-name").value.trim();
        const customer_phone = document.querySelector(".booking-service #phone-number").value.trim();
        const dateInput = document.querySelector("#date");
        const timeInput = document.querySelector('input[name="appointment-time"]:checked');
        const appointment_date =  `${dateInput.value} ${timeInput.value}:00`;
        const service = document.querySelector("#service").value;

        const selectedDateTime = new Date(`${dateInput.value} ${timeInput.value}`);
        const now = new Date();

        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            
            if (!dateInput.value) {
                dateInput.value = today;
            }
        }

        if (selectedDateTime < now) {
            messageModal("Nem választhatsz múltbéli időpontot!");
            return; 
        }

        
        console.log("hairdresser_id:", hairdresser_id);
        console.log("customer_name:", customer_name);
        console.log("customer_phone:", customer_phone);
        console.log("appointment_date:", appointment_date);
        console.log("service:", service);
        

        console.log(
            JSON.stringify({
                hairdresser_id,
                customer_name,
                customer_phone,
                appointment_date,
                service
            })
        );
        
        try {
            const res = await fetch(`/api/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    hairdresser_id,
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

/*
    Admin oldal táblázatok betöltése
*/

import { renderHairdresserList } from "/assets/modules/components/adminHairdressersTable.js"
import { renderDashboardTable } from "/assets/modules/API_communication/adminAppointmentsTable.js";
import { toggleDetails } from "/assets/modules/functionality/toggleDetails.js";

window.toggleDetails = toggleDetails;

if(document.querySelector("#hairdresser-list")) {
    renderHairdresserList();
    
document.querySelector(".d-nav #hairdressers").addEventListener("click", (e) => {
        e.preventDefault();
        renderHairdresserList(); 

        document.querySelector("#appointments-table").classList.add("hidden");
        document.querySelector("#hairdresser-list").classList.remove("hidden");
        
        document.querySelector("#appointments-list-mobile").classList.add("hidden");
        document.querySelector("#hairdresser-list-mobile").classList.remove("hidden");
    });

    document.querySelector(".d-nav #appointments").addEventListener("click", (e) => {
        e.preventDefault();
        renderDashboardTable(); 


        document.querySelector("#hairdresser-list").classList.add("hidden");
        document.querySelector("#appointments-table").classList.remove("hidden");


        document.querySelector("#hairdresser-list-mobile").classList.add("hidden");
        document.querySelector("#appointments-list-mobile").classList.remove("hidden");
    });
}



