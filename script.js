let coordinates=[36.84368,10.19737]
var mymap = L.map('mapid').setView(coordinates, 10.1184);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmVjaGlyNDIwIiwiYSI6ImNrc3hoMWM0NDBjbWsydnAybGlhb3c1amoifQ.T7tH6XOi4I1v2zegsIhVMg'
}).addTo(mymap);
var marker = L.marker(coordinates).addTo(mymap);
marker.bindPopup("<b>INSAT!</b>").openPopup();

let info = document.getElementById("info");


function onMapClick(e) {
    info.innerText="You clicked the map at latitude " + e.latlng.lat +" and longitude " + e.latlng.lng;
    var tmpMarker = L.marker(e.latlng).addTo(mymap);
}

mymap.on('click', onMapClick);

