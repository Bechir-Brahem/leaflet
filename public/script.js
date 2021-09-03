

groupDataByName();

var mymap = L.map('mapid', {
    center: mapCenter,
    zoom: mapZoom,
})
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
}).addTo(mymap);


createHtmlFilter();
drawBoats();


RasEnghela = L.marker([37.34454, 9.738801], {icon: lighthouseIcon, title: 'Ras Enghela'}).bindPopup(
    '<p style="text-align: center;">Ras Enghela <br>W | 1 flashes (/2s) | 38m<br>37.3445 | 9.7388</p>').addTo(mymap);
