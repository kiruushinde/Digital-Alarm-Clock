const currentTime = document.querySelector("h1"),
    content = document.querySelector(".content"),
    selectMenu = document.querySelectorAll("select");
// console.log(selectMenu);

let alarmTime, isAlarmSet = false,
    ringtone = new Audio("./ringtone.mp3");
// this for loop is used to access all the hours
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i; // --> this will print the numbers in two digits i.e. 01, 02, 03
    console.log(i);
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 1; i--) {
    i = i < 10 ? "0" + i : i; // --> this will print the numbers in two digits i.e. 01, 02, 03
    console.log(i);
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    console.log(i);
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = 'AM';

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    // by this condition our clock will start again from 12
    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // console.log(`${h}:${m}:${s} ${ampm}`);
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime == `${h}:${m} ${ampm}`) {
        // console.log("Alarm ringing..");
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm() {

    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        document.getElementById("btn").innerHTML = "Set Alarm";
        return isAlarmSet = false;
    }
    
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if (time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")) {
        return alert("Please, enter a valid time !");
    }

    isAlarmSet = true;
    console.log(time);
    content.classList.add("disable");
    document.getElementById("btn").innerHTML = "Clear Alarm";
    alarmTime = time;
}