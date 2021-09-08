const ICON_SIZE = [24, 24]
var lighthouseIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5052/5052379.png',
    iconSize: ICON_SIZE,
})

function generateBoatIcon(color,color2="black") {
    return L.divIcon({
        html: `<svg 
 height="24"
  viewBox="0 0 512 512"
   width="24"
   preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg">
    <g>
    <path d="m90.997 364.003h119.998v-216.821l-132.375 193.347c-6.805 9.94.33 23.474 12.377 23.474z" fill="` + color + `"> </path>
    <path d="m488.49 391.572h-224.999v-27.569h149.997c8.28 0 15-6.72 15-15 0-45.429-9.19-87.148-27.32-124.008-29.039-59.049-81.459-104.268-137.677-127.378v-82.608c0-10.61-10.75-17.85-20.55-13.93-.05.02-.09.04-.14.05-4.03 1.66-89.908 36.969-90.008 37.009-12.31 5.06-12.39 22.51-.13 27.69l80.829 34.129v291.615h-209.994c-9.217 0-16.388 8.233-14.803 17.86 16.103 105.627 13.38 87.765 13.693 89.818 1.112 7.331 7.414 12.75 14.83 12.75h335.291c51.636 0 97.805-29.107 120.101-73.312.075.006.152.007.227.013 4.44-8.93 7.89-18.39 10.24-28.21 2.365-9.88-4.925-18.919-14.587-18.919zm-224.999-248.235c40.059 49.959 40.119 120.338 0 170.367z" fill="`+color2+`" ></path>
    </g></svg>`,
        className: "dummy",
        iconSize: [0, 0],
        iconAnchor: [12, 12],
    });
}


var carIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
    iconSize: ICON_SIZE,
});
let mapCenter = [36, 10.5], mapZoom = 8;


people = [];
peopleCount = 0;
nameMap = new Map();
let colors = new Color();


/**
 * fills the Person.boats,nameMap, variables
 */
function groupDataByName() {
    boatData.forEach(boat => {
        if (!nameMap.has(boat.NA)) {
            people.push(new Person())
            nameMap.set(boat.NA, peopleCount);
            people[peopleCount].name = boat.NA;
            people[peopleCount].color = colors.getNext();
            peopleCount++;
        }
        people[nameMap.get(boat.NA)].boats.push(boat);
    });
    people.forEach(person => {
        person.sortByDate();
    })
}

/**
 * takes date as "YYYYMMDD" and returns "DD/MM/YYYY"
 * or if type is set to 1 returns "YYYY-MM-DD"
 * @param date
 * @param type
 * @returns {string}
 */
function numberToDateString(date, type = 0) {
    if (!type) {
        return date.substring(6, 8) + '/' + date.substring(4, 6) + '/' + date.substring(0, 4);
    }
    if (type === 1) {
        return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
    }
}

function numberToTimeString(str) {
    return str.substr(0, 2) + ':' + str.substr(2, 2)
}

function popupText(position) {
    return '<p style="text-align:center;">' + position.NA +
        '<br>(' + position.LT + ' , ' + position.LG + ')' +
        '<br>' + numberToDateString(position.DA) + " at " + numberToTimeString(position.TI) +
        '</p>'
}


/**
 * create html filter by person name
 */
function createHtmlFilter() {
    let html_filter = document.getElementById("name_filter");
    html_filter.addEventListener("click", handleEvent);
    html_filter.addEventListener("change", handleEvent);
    let tmp = "";
    people.forEach((person, index) => {
        let minDate = numberToDateString(person.boats[0].DA, 1);
        let maxDate = numberToDateString(person.boats[person.boats.length - 1].DA, 1);
        tmp += `<div class="person">
<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="checkbox` + index + `"   checked>
            <label class="form-check-label" for="flexSwitchCheckDefault">` + person.name + `</label>
            <div style="">from: <input class="ms-1 me-4" type="date" id="dateFrom` + index + `" value="` + minDate + `" min="`+minDate+`" max="`+maxDate+`">
            to: <input type="date" class="ms-1" id="dateTo` + index + `" value="` + maxDate + `" min="`+minDate+`" max="`+maxDate+`"></div>
            </div> 
            <div class="accordion -flush" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading` + index + `">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse` + index + `" aria-expanded="false" aria-controls="collapse` + index + `">
                            Problems (<span id="problemsCount`+index+`">0</span>)
                        </button>
                    </h2>
                    <div id="collapse` + index + `" class="accordion-collapse collapse " aria-labelledby="heading` + index + `"
                         data-bs-parent="#accordionExample">
                        <div class="accordion-body" id="problems` + index + `">
                            
                        </div>
                    </div>
                </div>
            </div>
            </div><br>`


    });
    html_filter.innerHTML = tmp;
}

function fillHtmlProblems() {
    let tmp = "";
    people.forEach((person, index) => {
        document.getElementById("problemsCount"+index).innerText=String(person.problems.length);
        tmp = "<li>" + person.problems.join("</li><li>") + "</li>";
        document.getElementById("problems" + index).innerHTML = tmp;
    })


}

function drawBoats() {
    people.forEach(person => {
        person.draw();
    })
}

function handleEvent(e) {
    let element = e.target;
    if (e.type === "click") {
        if (element.id.match(/checkbox[0-9]+$/)) {
            people[element.id.substring(8)].toggle();
        }
    } else if (e.type === "change") {
        if (element.id.match(/dateTo[0-9]+$/)) {
            let value = parseInt(element.value.split("-").join(''))
            people[element.id.substring(6)].endDate = value;
            people[element.id.substring(6)].reDraw();

        } else if (element.id.match(/dateFrom[0-9]+$/)) {
            let value = parseInt(element.value.split("-").join(''))
            people[element.id.substring(8)].startDate = value;
            people[element.id.substring(8)].reDraw();

        }
    }

}



