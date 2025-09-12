console.log("Fodrász kártya");
/*
    Fodrász kártya terv
        - felhasználva a fodrászok lekérdezett adatait és az ott felhasznált képeket az imgToHairdressers objektumból
*/

export class HairdressersCard {
    static #template = `
        <div class="flex-item">
            <div class="image-container"></div>
            <h3></h3>
            <h5 id="phone"></h5>
            <h6 id="email"></h6>
            <div class="text-container working-hours">
                <p></p>
            </div>
            <div class="text-container services">
                <p>Szolgáltatások:</p>
                <ul class="service-list"></ul>
            </div>
            <button class="appointment">Időpontfoglalás</button>
        </div>
    `;

    cardElement;
    container = null;

    constructor (datas, container) {
        this.id = datas.id;
        this.name = datas.name;
        this.phoneNumber = datas.phoneNumber;
        this.email = datas.emailAddresse;
        this.workingHours = datas.workingHours;
        this.services = datas.services;
        this.imgSrc = datas.imgSrc;

        this.container = container;
    };

    renderHairdressers () {
        const div = document.createElement("div");
        div.innerHTML = HairdressersCard.#template;
        this.cardElement = div.firstElementChild;

        this.cardElement.querySelector("h3").textContent = this.name;
        this.cardElement.querySelector("h3").dataset.id = this.id;
        this.cardElement.querySelector("#phone").textContent = `Telefonszám: ${this.phoneNumber}`;
        this.cardElement.querySelector("#email").textContent = `Email cím: ${this.email}`;
        this.cardElement.querySelector(".working-hours p").textContent = `Munkaidő: ${this.workingHours}`;

        const servicesList = this.cardElement.querySelector(".service-list");

        servicesList.innerHTML = "";
        this.services.forEach(service => {
            const li = document.createElement("li");
            li.textContent = service;
            servicesList.appendChild(li);
        });

        const imageContainer = this.cardElement.querySelector(".image-container");

        imageContainer.style.backgroundImage = `url(${this.imgSrc})`;
        imageContainer.style.backgroundSize = "cover";
        imageContainer.style.backgroundPosition = "center";

        this.container.appendChild(this.cardElement);
    };
}