console.log("Admin felület fodrászok adatai táblázat");
import { getHairdressers } from "/assets/modules/API_communication/fetchHairdressersData.js";

export async function renderHairdresserList() {
    try {
        const hairdressers = await getHairdressers();
        const tableBody = document.querySelector("#hairdresser-list tbody");
        tableBody.innerHTML = "";
        const mobileList = document.querySelector('#hairdresser-list-mobile');
        mobileList.innerHTML = '';

        hairdressers.forEach(hairdresser => {
            const row = document.createElement("tr");
            const serviceList = hairdresser.services.join(", ");

            row.innerHTML = `
                <td>${hairdresser.name}</td>
                <td>${hairdresser.phoneNumber}</td>
                <td>${hairdresser.emailAddress}</td>
                <td>${hairdresser.workingHours}</td>
                <td>${serviceList}</td>
            `;
            tableBody.appendChild(row)

            mobileList.innerHTML += `
                <div class="admin-item">
                    <div class="admin-header" onclick="toggleDetails(this)">
                        <span>${hairdresser.name}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="admin-details">
                        <p><strong>Telefon:</strong> ${hairdresser.phoneNumber}</p>
                        <p><strong>Email:</strong> ${hairdresser.emailAddress}</p>
                        <p><strong>Munkaidő:</strong> ${hairdresser.workingHours}</p>
                        <p><strong>Szolgáltatások:</strong> ${serviceList}</p>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}