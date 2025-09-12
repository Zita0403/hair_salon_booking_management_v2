console.log("Form validáció");

import { messageModal } from "/assets/modules/components/messageModal.js";

export function validateForm () {

    const customer_name = document.querySelector(".booking-service #client-name").value.trim();
    const customer_phone = document.querySelector(".booking-service #phone-number").value.trim();
    const dateInput = document.querySelector("#date");
    const timeInput = document.querySelector('input[name="appointment-time"]:checked');

    if (!dateInput || !timeInput) {
        messageModal("Kérlek válaszd ki a számodra megfelelő időpontot és idősávot!");
        return false;
    }

    const appointment_date =  `${dateInput.value} ${timeInput.value}:00`;
    const service = document.querySelector("#service").value;

    if (!customer_name) {
        messageModal("Kérlek add meg a neved az időpontfoglaláshoz!");
        return false;
    } else if (!customer_phone || !customer_phone.match(/([+][36]{2}|[06]{2})(\s*-?\s*)([1-90]{2})(\s*-?\/?\s*)([0-9]{3})(\s*-?\s*)([0-9]{4})/)) {
        messageModal("Kérlek addj meg egy érvényes telefonszámot az időpontfoglaláshoz!");
        return false;
    } else if (!service) {
        messageModal("Kérlek válassz egy szolgáltatást az időpontfoglaláshoz!");
        return false;
    }
    
    return true;
}