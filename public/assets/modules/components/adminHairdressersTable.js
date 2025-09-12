console.log("Admin felület fodrászok adatai táblázat");
import { getHairdressers } from "/assets/modules/API_communication/fetchHairdressersData.js";
import { imgToHairdressers } from "/assets/modules/functionality/imgDatas.js";

export async function renderHairdresserList() {
    try {
        const hairdressers = await getHairdressers(imgToHairdressers);
        const tableBody = document.querySelector("#hairdresser-list tbody");
        tableBody.innerHTML = "";

        hairdressers.forEach(hairdresser => {
            const row = document.createElement("tr");
            const serviceList = hairdresser.services.join(", ");

            row.innerHTML = `
                <td>${hairdresser.name}</td>
                <td>${hairdresser.phoneNumber}</td>
                <td>${hairdresser.emailAddresse}</td>
                <td>${hairdresser.workingHours}</td>
                <td>${serviceList}</td>
            `;
            tableBody.appendChild(row)
        });
    } catch (error) {
        console.log(error);
        
    }
}