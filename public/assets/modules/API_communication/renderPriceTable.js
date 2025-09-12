console.log("Árlista táblázat");
/*
    Főoldalon szereplő árlistához a szolgáltatások lekérdezése hozzá a fiktív árlista felhasználása és ártáblázat generálása
*/

export async function renderPriceTable (priceList) {
    try {
        const response = await fetch("http://salonsapi.prooktatas.hu/api/hairdressers");
        const hairdressers = await response.json();
        const services = hairdressers.map(hairdresser => hairdresser.services);
        let servicesArr = [];

        const isObject = (o) => typeof o === "object" && o.constructor == Object || Array.isArray(o);

        function servicesForPriceList (service) {
            for (const key in service) {
                if (isObject(service[key])) {
                    servicesForPriceList(service[key]);
                } else {
                    if(!servicesArr.includes(service[key]))
                    servicesArr.push(service[key]);
                }
            }
        }

        servicesForPriceList(services);

        const result = servicesArr.map(value => ({
            name: value,
            price: priceList[value] || "Nincs ár megadva"
        }));

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
                    ${result.map(service => `
                    <tr>
                        <td>${service.name}</td>
                        <td>${service.price}</td>
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