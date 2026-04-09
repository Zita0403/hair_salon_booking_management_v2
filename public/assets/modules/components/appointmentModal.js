console.log("Időpontfoglaló ablak kinézete, működése");
import { fetchAppointments } from "/assets/modules/API_communication/appointmentManaging.js";
//Időpontfoglalás
export function bookingModal () {
    const modal = document.querySelector("#booking-modal");
    //Ablak bezárása
    const clsBtn = document.querySelector("#close-btn");

    if (clsBtn) {
        clsBtn.addEventListener("click", function() {
            const modal = document.querySelector("#booking-modal");
            modal.classList.remove("visible");
            modal.classList.add("hidden");
        });
    };

    async function openModalDatas (name, id, services, intvals) {
        modal.classList.remove("hidden");
        modal.classList.add("visible");


        modal.querySelector("h3").textContent = name;
        modal.querySelector("#hairdresser-name").dataset.id = id;

        const select = modal.querySelector("select");
        select.innerHTML = "";
        
        services.forEach( service => {
            const option = document.createElement("option");
            option.value = service;
            option.textContent = service;
            select.appendChild(option);
        });

        const dateInput = document.querySelector("#date");
        const intvalContainer = document.querySelector(".appointment-intval");

        const todayStr = new Date().toISOString().split('T')[0];
        dateInput.min = todayStr;
        if (!dateInput.value) dateInput.value = todayStr;

        const appointments = await fetchAppointments();
        // console.log(appointments);
        

        function updateTimeIntvals () {
            const selectedDate = dateInput.value;
            intvalContainer.innerHTML = "";

            
            
            const reservedIntval = appointments
                .filter(appointment => Number(appointment.hairdresser_id) === Number(id) && appointment.appointment_date.startsWith(selectedDate))
                .map(appointment => appointment.appointment_date.split(" ")[1].slice(0, 5));

            // console.log("Lefoglalt időpontok:", reservedIntval);
            // console.log("Elérhető idősávok:", intvals);
            const freeIntvals = intvals.filter(slot => !reservedIntval.includes(slot.time));
    
            freeIntvals.forEach(slot => {
                const labelForm = document.createElement("label");
                const inputForm = document.createElement("input");
                const isPastTime = (selectedDate === todayStr && slot.isPast);
                inputForm.type = "radio";
                inputForm.name = "appointment-time";
                inputForm.value = slot.time;

                if (isPastTime) {
                    inputForm.disabled = true;
                    labelForm.classList.add("disabled-slot");
                }

                labelForm.appendChild(inputForm);
                labelForm.append(`${slot.time}`);
                intvalContainer.appendChild(labelForm);
            });

        }

        updateTimeIntvals();

        dateInput.addEventListener("change", () => {
            updateTimeIntvals();
        });

    };

    return openModalDatas;
};