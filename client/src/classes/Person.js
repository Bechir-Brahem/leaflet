import {numberToDateString, numberToTimeString} from "./Helper";
import L from "leaflet"

export class Person {
    SOSmarkers = [];

    sos = [];

    constructor(name) {
        this.name = name;
    }

    polylines = [];
    name = "";
    /**
     * @type {Position[]}
     */
    positions = []
    markers = []
    problems = []
    layerGroup = L.layerGroup();
    color;
    icons;
    allSOS=[]


    update(state) {

        let lastPos = null
        let tmpPolyline = [];
        let pos;
        this.markers = []
        this.polylines = []
        this.problems = []
        this.SOSmarkers = []
        if (!state.isShown) return;

        for (pos of this.positions) {

            if (!this.checkDate(pos, state)) continue;

            let problem = false;
            if (lastPos && this.checkProblem(pos, lastPos)) {
                this.insertPolyline(tmpPolyline, pos)
                tmpPolyline = [[lastPos.lt, lastPos.lg], [pos.lt, pos.lg]];
                this.insertPolyline(tmpPolyline, pos, "b", true, lastPos)
                tmpPolyline = []
                problem = true;
                this.problems.push([pos, lastPos])
            }

            tmpPolyline.push([pos.lt, pos.lg])
            if (pos.tm) {
                this.allSOS.push([pos.getMarker(problem, this.name, this.icons), pos])
            } else
                this.markers.push(pos.getMarker(problem, this.name, this.icons))
            lastPos = pos
        }
        this.insertPolyline(tmpPolyline, pos, "c")
        if (this.allSOS.length>0)
            this.SOSmarkers=[this.allSOS[0]]
        console.log(this.SOSmarkers)


    }


    /**
     * checks if the time differance between two positions is more than 2 hours
     * @param {Position} position the more recent position
     * @param {Position} lastPos the previous position
     * @return {Boolean} if there's a problem return true, false otherwise
     */
    checkProblem(position, lastPos) {
        // combines pos.DA and pos.TI to make a Date object
        let posDate = new Date(numberToDateString(position.date, 1) + " " + numberToTimeString(position.time));
        let lastPosDate = new Date(numberToDateString(lastPos.date, 1) + " " + numberToTimeString(lastPos.time));

        //diff contains the difference between the two positions in milliseconds
        let diff = lastPosDate - posDate;
        // contains the difference in minutes
        diff = diff / 1000 / 60
        return diff > 120;


    }

    /**
     * takes a list of coordinates and inserts Polyline component to the polyline array
     * @param {Array} tmpPolyline array containing coordinates
     * @param {Position} pos
     * @param ref a variable used to make sure that keys are unique
     * @param {boolean} problem is the current polyline in a state of a problem?
     * @param {Position} lastPos  last position
     */
    insertPolyline(tmpPolyline, pos, ref = "a", problem = false, lastPos = null) {
        /** if array contains less than one item than it can't form a polyline */
        if (tmpPolyline.length <= 1) return;

        let obj, text

        let polylineText = (pos, problem = false, lastPos = null) => {
            if (problem) {
                return this.name + " " + numberToDateString(lastPos.date) + " " + numberToTimeString(lastPos.time) + " => " +
                    numberToDateString(pos.date) + " " + numberToTimeString(pos.time)
            }
            return '<p style="text-align:center;">this.name</p>'
        }

        /** generates obj which contains information about the type of line
         * and text which is the inner text if the popup
         */
        if (problem) {
            obj = {color: 'red', dashArray: "20,20"}
            text = polylineText(pos, problem, lastPos)


        } else {
            obj = {color: this.color};
            text = polylineText(pos)
        }

        /** creates the Polyline and pushes it to the array */
        this.polylines.push(
            L.polyline(tmpPolyline, obj).bindPopup(text)
        );

    }

    checkDate(pos, state) {
        let date = new Date(numberToDateString(pos.date, 1));
        return state.startDate <= date && date <= state.endDate;
    }

    draw(map, state) {
        if (state.allPos) {
            this.layerGroup = L.layerGroup(this.polylines.concat(this.markers))
            this.layerGroup.addTo(map)
        } else if (this.markers.length > 0) {
            console.log("here")
            this.layerGroup = L.layerGroup([this.markers[0]])
            this.layerGroup.addTo(map);
        }


        this.SOSmarkers.forEach(arr => {
            let marker = arr[0];
            let pos = arr[1];
            if (pos.interval === 0 || pos.interval === -1)
                pos.interval = setInterval(() => {
                    if (map.hasLayer(marker)) {
                        map.removeLayer(marker);
                    } else {
                        map.addLayer(marker)
                    }
                }, 1000)

        })
    }

    undrawSOS() {
        this.SOSmarkers.forEach(arr => {
            let marker = arr[0];
            let pos = arr[1];
            clearInterval(pos.interval);
            marker.remove();
            pos.interval = 0;

        })
    }
}