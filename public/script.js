let coordinates=[36.84368,10.19737]
var mymap = L.map('mapid').setView(coordinates, 10.1184);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiYmVjaGlyNDIwIiwiYSI6ImNrc3hoMWM0NDBjbWsydnAybGlhb3c1amoifQ.T7tH6XOi4I1v2zegsIhVMg'
// }).addTo(mymap);



L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(mymap);

let boats=[
	[37.2040991539,10.561981201171877],
	[37.07166625179732,10.450744628906252],
	[36.94448827031145,10.505676269531252],
	[36.76542199712225,11.086578369140627],
	[36.936806930865515,11.354370117187502],
	[36.622307942210774,11.108551025390627]
];
let cars=[
	 [36.97849632169809,9.409790039062502],
	[36.81599852006379,9.684448242187502],
	[37.000428937853926,9.87945556640625],
	[36.62340983601041,9.997558593750002],
	[36.663067521060654,9.547119140625002]

];

let carMarkers=[];
let boatMarkers=[];

var boatIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2932/2932345.png',
    iconSize:     [48, 48],
});



var carIcon = L.icon({
	iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
	iconSize:     [48, 48],
});

boats.forEach(boat =>{
	let tmp=L.marker(boat, {icon: boatIcon}).addTo(mymap);
	boatMarkers.push(tmp);
})


cars.forEach(car =>{
	let tmp=L.marker(car, {icon: carIcon}).addTo(mymap);
	carMarkers.push(tmp);
})


var polyline1 = L.polyline(cars, {color: 'red'}).addTo(mymap);
var polyline2 = L.polyline(boats, {color: 'blue'}).addTo(mymap);


// marker.bindPopup("<b>INSAT!</b><br>"+coordinates.toString()).openPopup();
// let info = document.getElementById("info");
// function onMapClick(e) {
//     info.innerText="You clicked the map at latitude " + e.latlng.lat +" and longitude " + e.latlng.lng;
//     var tmpMarker = L.marker(e.latlng).addTo(mymap);
// }
//
// mymap.on('click', onMapClick);

