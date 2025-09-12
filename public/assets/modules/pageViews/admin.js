/*
    Admin oldal táblázatok betöltése
*/

import { renderHairdresserList } from "./modules/adminHairdressersTable.js"
import { renderDashboardTable } from "./modules/adminAppointmentsTable.js";

if(document.querySelector("#hairdresser-list")) {
    renderHairdresserList();
    
    document.querySelector(".d-nav #hairdressers").addEventListener("click", (e) => {
        // console.log(document.querySelector(".d-nav #hairdressers"));
        
        e.preventDefault();
        renderDashboardTable();
        document.querySelector("#appointments-table").classList.add("hidden");
        document.querySelector("#hairdresser-list").classList.remove("hidden");
    });


    document.querySelector(".d-nav #appointments").addEventListener("click", (e) => {
        e.preventDefault();
        renderHairdresserList();
        document.querySelector("#hairdresser-list").classList.add("hidden");
        document.querySelector("#appointments-table").classList.remove("hidden");
    });
}