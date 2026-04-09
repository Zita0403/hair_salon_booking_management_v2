console.log("Admin felület lefoglalt időpontok táblázata");

/*
    A lefoglalt időpontok megjelenítése az admin oldalon táblázatban
*/

export async function renderDashboardTable () {
    try {
        const response = await fetch(`/api/get-appointments/:apiKey`);
        const appointments = await response.json();
        const tableBody = document.querySelector("#appointments-table tbody");
        tableBody.innerHTML = "";
        const mobileList = document.querySelector("#appointments-list-mobile");
        if (mobileList) mobileList.innerHTML = "";

        appointments.forEach(appointment => {
            const tableRow = document.createElement("tr");

            const date = new Date(appointment.appointment_date);
            const formattedDate = date.toLocaleString("hu-HU", {
                dateStyle: "short",
                timeStyle: "short",
            });

            tableRow.innerHTML = `
                <td>${appointment.hairdresser_name}</td>
                <td>${formattedDate}</td>
                <td>${appointment.customer_name}</td>
                <td>${appointment.customer_phone}</td>
                <td>${appointment.service}</td>
            `;

            tableBody.appendChild(tableRow);

            if (mobileList) {
                mobileList.innerHTML += `
                    <div class="admin-item">
                        <div class="admin-header" onclick="toggleDetails(this)">
                            <span>${formattedDate} - ${appointment.customer_name}</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="admin-details">
                            <p><strong>Fodrász:</strong> ${appointment.hairdresser_name}</p>
                            <p><strong>Szolgáltatás:</strong> ${appointment.service}</p>
                            <p><strong>Telefonszám:</strong> ${appointment.customer_phone}</p>
                        </div>
                    </div>
                `;
            }
        });

    } catch (error) {
        console.log(error);
    }
}