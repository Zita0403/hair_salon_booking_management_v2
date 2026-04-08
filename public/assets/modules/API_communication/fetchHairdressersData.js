console.log("Fodrászok adatainak lekérdezése fetch()");
/*
    Fodrászok adatainak lekérdezése a kártyákon való megjelenítéshez
        - munkaidő formázása
*/

export async function getHairdressers () {
    try {
        const response = await fetch("http://localhost:4000/api/hairdressers");
        const hairdressers = await response.json();

        return hairdressers.map(hairdresser => {
            const imgSrc = hairdresser.profile_image;
            const name = hairdresser.name;
            const id = hairdresser.id;
            const phoneNumber = hairdresser.phone_number;
            const emailAddress = hairdresser.email;
            const startTime = hairdresser.work_start_time.split(":").slice(0, 2).join(":");
            const endTime = hairdresser.work_end_time.split(":").slice(0, 2).join(":");
            const workingHours =  startTime + " - " + endTime;
            const services = hairdresser.services;

            return {
                imgSrc, 
                id, 
                name, 
                phoneNumber, 
                emailAddress, 
                workingHours, 
                services
            };
        });
        
    } catch (error) {
        console.log(`${error}: Nem sikerült a fordászok adatainak lekérdezése.`);
    }
};