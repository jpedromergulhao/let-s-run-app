const rideListElement = document.querySelector("#rideList");
const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value);
    ride.id = id;

    const itemElement = document.createElement("li");
    itemElement.id = ride.id;
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"

    rideListElement.appendChild(itemElement);

    itemElement.addEventListener("click", () => {
        window.location.href = `./details.html?id=${ride.id}`;
    })

    const firstPosition = ride.data[0];
    const firstLocationData = await geolocationData(firstPosition.latitude, firstPosition.longitude);

    const mapID = `map${ride.id}`;
    const mapElement = document.createElement("div");
    mapElement.id = mapID;
    mapElement.style = "width: 100px; height: 100px";
    mapElement.classList.add("bg-secondary");
    mapElement.classList.add("rounded-4");


    const dataElement = document.createElement("div");
    dataElement.className = "flex-fill d-flex flex-column";

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`;
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`;
    distanceDiv.className = "";

    const durationDiv = document.createElement("div");
    durationDiv.innerText = `Run duration: ${getDuration(ride)}`;
    durationDiv.className = "mg"

    const dateDiv = document.createElement("div");
    dateDiv.innerText = getStartDate(ride);
    dateDiv.className = "text-secondary mt-2";

    dataElement.appendChild(cityDiv);
    dataElement.appendChild(maxSpeedDiv);
    dataElement.appendChild(distanceDiv);
    dataElement.appendChild(durationDiv);
    dataElement.appendChild(dateDiv);

    itemElement.appendChild(mapElement);
    itemElement.appendChild(dataElement);

    const map = L.map(mapID, {
        attributionControl: false,
        scrollWheelZoom: false,
        zoomControl: false,
        dragging: false
    });
    map.setView([firstPosition.latitude, firstPosition.longitude], 14)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(map);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    }).addTo(map);

    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map);

});
