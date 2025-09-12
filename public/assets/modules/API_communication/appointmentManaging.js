console.log("Foglalások kezelése");
/*
    Foglalt időpontok kezelése
*/
let appointments = [];

export async function fetchAppointments () {
    try {
        const api_key = "prooktatas123";
        const response = await fetch(`http://salonsapi.prooktatas.hu/api/appointments/${api_key}`);
        appointments = await response.json();
        // console.log(appointments);
        
        return appointments;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function appointmentsByHairdresser(appointments) {
    const result = {};

    appointments.forEach(appointment => {
        const hairdresserID = appointment.hairdresser_id;
        const [date, time] = appointment.appointment_date.split(" ");
        result[hairdresserID] = {};
        result[hairdresserID][date] = [];
        result[hairdresserID][date].push(time.slice("0,5 "));
        
        
    });
    console.log(result);
    
    return result;
}