

const timeConvert = (seconds) =>{
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + Math.floor(extraSeconds) : Math.floor(extraSeconds);

    return `${minutes}:${extraSeconds}`
}

export default timeConvert
