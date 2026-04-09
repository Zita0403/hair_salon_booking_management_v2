console.log("Árlista táblázat");
/*
    Főoldalon szereplő árlistához a szolgáltatások lekérdezése hozzá a fiktív árlista felhasználása és ártáblázat generálása
*/

export async function renderPriceTable () {
    try {
        const response = await fetch("/api/services");
        const services = await response.json();

        const pricesTable = document.querySelector(".price-table");

        if (pricesTable) {
            pricesTable.innerHTML = `
                <table class="services">
                    <thead>
                        <tr>
                            <th>Szolgáltatás</th>
                            <th>Ár</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${services.map(service => `
                        <tr>
                            <td>${service.service_name}</td>
                            <td>${Number(service.service_price).toLocaleString("hu-HU", {
                                style: "currency",
                                currency: "HUF",
                                minimumFractionDigits: 0
                            })}</td>
                        </tr>
                        `).join("")}
                    </tbody>
                </table>
            `;
        }


    } catch (error) {
        console.log(error);
    }
};