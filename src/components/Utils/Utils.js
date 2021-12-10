

export function secondsToHHMMSS(seconds){
    const HH = formatTo2((seconds / 3600)>>0)
    const MM = formatTo2(((seconds%3600)/60)>>0)
    const SS = formatTo2(seconds%60)
    return `${HH}:${MM}:${SS}`
}

export function secondsToHour(seconds){
    const HH = (seconds / 3600) >> 0;
    const MM = ((seconds % 3600) / 60) >> 0;
    const SS = seconds%60;
    if (HH>0){
        return `${HH} hours ${MM} minutes`;
    } else {
        return `${MM} minutes ${SS} seconds`;
    }
}

function formatTo2(n){
    if (n<10) return `0${n}`;
    else return `${n}`;
}

const month_lookup = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
}


export function dateToReadable(date_string){
        if (date_string == '') return '';
        const date = new Date(date_string+'T00:00:00');
        if(isToday(date)) {
            return "today";
        }else {
            return month_lookup[date.getMonth()] + " " + date.getDate();
        }
    }
    
export function isSameDay(o1, o2){
    return o1.getFullYear() === o2.getFullYear() &&
    o1.getMonth() === o2.getMonth() &&
    o1.getDate() === o2.getDate();
}

export function isToday(date){
    const today = new Date();
    return isSameDay(date, today);
}

export function dateStringIsToday(date_string){
    const today = new Date();
    const date = new Date(date_string+'T00:00:00');
    return isSameDay(date, today);
}