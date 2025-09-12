console.log("Fodrászok adatainak lekérdezése fetch()");
/*
    Fodrászok adatainak lekérdezése a kártyákon való megjelenítéshez
        - hozzá imgDatas.js imgToHairdressers object -ből minden fodrászhoz kép csatolása
        - munkaidő formázása
*/

export async function getHairdressers (imgDatas) {
    try {
        const response = await fetch("http://salonsapi.prooktatas.hu/api/hairdressers");
        const hairdressers = await response.json();

        return hairdressers.map(hairdresser => {
            const imgSrc = imgDatas[hairdresser.name];
            const name = hairdresser.name;
            const id = hairdresser.id;
            const phoneNumber = hairdresser.phone_number;
            const emailAddresse = hairdresser.email;
            const startTime = hairdresser.work_start_time.split(":").slice(0, 2).join(":");
            const endTime = hairdresser.work_end_time.split(":").slice(0, 2).join(":");
            const workingHours =  startTime + " - " + endTime;
            const services = hairdresser.services;

            return {
                imgSrc, 
                id, 
                name, 
                phoneNumber, 
                emailAddresse, 
                workingHours, 
                services
            };
        });
        
    } catch (error) {
        console.log(`${error}: Nem sikerült a fordászok adatainak lekérdezése.`);
    }
};