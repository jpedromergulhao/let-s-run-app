const speedElement = document.querySelector("#speed");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const hours = document.querySelector("#hour");
let watchID = null;
let currentRide = null;

startBtn.addEventListener("click", () => {
    if (watchID) // Will show the speed on screen if ID navigator != null
        return;

    // Function that gets the device speed and converts it to km/h
    function success(position) {
        addPosition(currentRide, position);
        speedElement.innerText = position.coords.speed ?
            (position.coords.speed * 3.6).toFixed(1) : 0;
    }

    function error(error) {
        console.error("Error getting position: ", error);
        speedElement.innerText = "Error";
    }

    const options = { enableHighAccuracy: true };

    currentRide = createNewRide();
    watchID = navigator.geolocation.watchPosition(success, error, options);

    startBtn.classList.add("d-none");
    stopBtn.classList.remove("d-none");
});

stopBtn.addEventListener("click", () => {
    if (!watchID) // Will clear speed just if ID navigator is not null
        return;
    navigator.geolocation.clearWatch(watchID);
    watchID = null;
    updateStopTime(currentRide);
    currentRide = null;
    startBtn.classList.remove("d-none");
    stopBtn.classList.add("d-none");

    window.location.href = "./"
});

//hour
function displayLocalTime() {
    const now = new Date();

    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    hour.textContent = formattedTime;
}

setInterval(displayLocalTime, 1000);

displayLocalTime();
