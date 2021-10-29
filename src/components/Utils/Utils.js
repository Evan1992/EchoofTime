

export function secondsToHHMMSS(seconds){
    const HH = formatTo2(Math.floor(seconds/3600))
    const MM = formatTo2(Math.floor(seconds/60))
    const SS = formatTo2(seconds%60)
    return `${HH}:${MM}:${SS}`
}

export function secondsToHour(seconds){
    const HH = Math.floor(seconds/3600)
    const MM = Math.floor(seconds/60)
    const SS = seconds%60
    if (HH>0){
        return `${HH} hours ${MM} minutes`
    } else {
        return `${MM} minutes ${SS} seconds`
    }
}

function formatTo2(n){
    if (n<10) return `0${n}`;
    else return `${n}`;
}