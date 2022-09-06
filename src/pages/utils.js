export const parseMillisecondToReadableType = (milliseconds) => {
    let seconds = milliseconds / 1000
    let sec = seconds % 60;
    let min = parseInt(seconds / 60);
    if (sec.toString().length === 1) {
        sec = "0" + sec;
    }
    return min + ":" + sec;
}


export const MessageCodes = {
    CHANGED_GAME_STATUS: 'CHANGED_GAME_STATUS',
    REQUEST_GAME_STATUS: 'REQUEST_GAME_STATUS',
    UPDATE_TIMER: 'UPDATE_TIMER',
    TOGGLE_SAFEGUARD: 'TOGGLE_SAFEGUARD',
    UPDATE_SAFEGUARD: 'UPDATE_SAFEGUARD',
    REGUEST_SAFEGUARD_STATUS: 'REGUEST_SAFEGUARD_STATUS'
}

export const generaeRandomTicketId = (min = 100000000, max = 999999999) => {
    return (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) % (max - min + 1)) + min;
}

export const padNumbers = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}



export const BASE_URL = 'https://spinner.alnejashi.com'
// export const BASE_URL = 'http://localhost:5000'