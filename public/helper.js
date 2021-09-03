const ICON_SIZE=[24,24]
var lighthouseIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5052/5052379.png',
    iconSize: ICON_SIZE,
})
var boatIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2932/2932345.png',
    iconSize: ICON_SIZE,
});


var carIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
    iconSize: ICON_SIZE,
});
let mapCenter = [36, 10.5], mapZoom = 8;


boats = [];

people=[];
peopleCount = 0;
nameMap = new Map();



/**
 * fills the Person.boats,nameMap, variables
 */
function groupDataByName() {
    boatData.forEach(boat => {
        if (!nameMap.has(boat.NA)) {
            people.push(new Person())
            nameMap.set(boat.NA, peopleCount);
            people[peopleCount].name=boat.NA;
            peopleCount++;
        }
        people[nameMap.get(boat.NA)].boats.push(boat);
    });
}

function popupText(position) {
    return '<p style="text-align:center;">' + position.NA +
        ' <br>' + position.LT +
        ' | ' + position.LG + '</p>'
}


/**
 * create html filter by person name
 */
let html_filter = document.getElementById("name_filter");
function createHtmlFilter(){
    let tmp = "";
    nameMap.forEach((value, person) => {

        tmp += '<div class="form-check-inline form-switch">' +
            '<input class="form-check-input" type="checkbox" id="checkbox'+value+'" onclick="toggleBoats()"  checked>' +
            '<label class="form-check-label" for="flexSwitchCheckDefault">' + person + '</label>' +
            '</div>'


    });
    html_filter.innerHTML = tmp;
}



function drawBoats() {
people.forEach(person=>{
    person.draw();
})
}
function handleEvent(e){
    let element=e.target;
    if (element.id.match(/checkbox[0-9]+$/)) {
        people[element.id.substring(8)].toggle();
    }

}
html_filter.addEventListener("click",handleEvent);

function toggleBoats(){

}