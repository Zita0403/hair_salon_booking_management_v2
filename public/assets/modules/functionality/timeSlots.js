console.log("Idősávok létrehozása az időpontfoglaláshoz");
/*
    30 perces idősávok létrehozása a fodrászok munkaideje alapján fodrászonként -> radio button 
*/

export function periodsByHairdresser (name, workingHours) {
    // console.log(workingHours);
    
    const start = workingHours.split(" - ")[0];
    const end = workingHours.split(" - ")[1];

    // console.log(start, end);

    const startHour = Number(start.split(":")[0]);
    const startMinute = Number(start.split(":")[1]);
    const endHour = Number(end.split(":")[0]);
    const endMinute = Number(end.split(":")[1]);

    const startDate = new Date(); 
    startDate.setHours(startHour, startMinute, 0, 0);
    // console.log(startDate);
    
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);

    const periods = [];
    const formatter = new Intl.DateTimeFormat('hu-HU', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });

    while (startDate < endDate) {
        periods.push(formatter.format(startDate));
        startDate.setMinutes(startDate.getMinutes() + 30);
    }

    const hairdresserPeriods = {
        [name] : periods
    };
    // console.log(hairdresserPeriods);
    return hairdresserPeriods;
}