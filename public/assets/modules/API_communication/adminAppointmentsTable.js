console.log("Admin felület lefoglal időpontok táblázata");
import { getHairdressers } from "/assets/modules/API_communication/fetchHairdressersData.js";
import { imgToHairdressers } from "/assets/modules/functionality/imgDatas.js"
/*
    A lefoglalt időpontok megjelenítése az admin oldalon táblázatban
*/

export async function renderDashboardTable () {
    try {
        const hairdressers = await getHairdressers(imgToHairdressers);
        // console.log(hairdressers);
        const hairdresserList = {};

        for (const hairdresser of hairdressers) {
            hairdresserList[hairdresser.id] = hairdresser.name;
        }
        
        const api_key = "prooktatas123";
        const response = await fetch(`http://salonsapi.prooktatas.hu/api/appointments/${api_key}`);
        const appointments = await response.json();
        const tableBody = document.querySelector("#appointments-table tbody");
        tableBody.innerHTML = "";

        appointments.forEach(appointment => {
            // console.log(appointment);
            
            const tableRow = document.createElement("tr");

            tableRow.innerHTML = `
                <td>${hairdresserList[appointment.hairdresser_id]}</td>
                <td>${appointment.appointment_date}</td>
                <td>${appointment.customer_name}</td>
                <td>${appointment.customer_phone}</td>
                <td>${appointment.service}</td>
            `;

            tableBody.appendChild(tableRow);
        });


    } catch (error) {
        console.log(error);
    }
};