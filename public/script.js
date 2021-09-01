let coordinates = [36.84368, 10.19737]



let boats = [
    [37.2040991539, 10.561981201171877],
    [37.07166625179732, 10.450744628906252],
    [36.94448827031145, 10.505676269531252],
    [36.76542199712225, 11.086578369140627],
    [36.936806930865515, 11.354370117187502],
    [36.622307942210774, 11.108551025390627]
];
let cars = [
    [36.97849632169809, 9.409790039062502],
    [36.81599852006379, 9.684448242187502],
    [37.000428937853926, 9.87945556640625],
    [36.62340983601041, 9.997558593750002],
    [36.663067521060654, 9.547119140625002]

];

let carMarkers = [];
let boatMarkers = [];


var lighthouseIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5052/5052379.png',
    iconSize: [48, 48],
})
var boatIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2932/2932345.png',
    iconSize: [48, 48],
});


var carIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
    iconSize: [48, 48],
});



var carPolyline = L.polyline(cars, {color: 'red'});
var boatPolyline = L.polyline(boats, {color: 'blue'});




boats.forEach(boat => {
	let tmp = L.marker(boat, {icon: boatIcon, title: 'boat'})
		.bindPopup('<p style="text-align:center;">batou <br>' + boat[0].toFixed(5) + ' | ' + boat[1].toFixed(5) + '</p>')
	boatMarkers.push(tmp);
})


cars.forEach(car => {
	let tmp = L.marker(car, {icon: carIcon, title: 'car'})
		.bindPopup('<p style="text-align:center;">karhba <br>' + car[0].toFixed(5) + ' | ' + car[1].toFixed(5) + '</p>')
	carMarkers.push(tmp);
})

let carGroup=L.layerGroup(carMarkers);
let boatGroup=L.layerGroup(boatMarkers);


var mymap = L.map('mapid',{
	center:coordinates,
	zoom:9,
	layers:[carPolyline,boatPolyline,carGroup,boatGroup]
})

var mapFilter={
	"boats":boatGroup,
	"cars":carGroup,
	"car line":carPolyline,
	"boat line":boatPolyline,


}

L.control.layers({},mapFilter).addTo(mymap);




L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(mymap);

// class filter {
//     constructor() {
//         this.boats = true;
//         this.cars = true;
//         this.lighthouses = true;
//     }
// }
//
// let options = new filter();
//
//
// function toggleBoats() {
//     if (options.boats) {
//
//
//     } else {
//
//     }
//     options.boats = !options.boats;
//
//
// }



RasEnghela = L.marker([37.34454, 9.738801], {icon: lighthouseIcon, title: 'Ras Enghela'}).bindPopup(
	'<p style="text-align: center;">Ras Enghela <br>W | 1 flashes (/2s) | 38m<br>37.3445 | 9.7388</p>').addTo(mymap);
