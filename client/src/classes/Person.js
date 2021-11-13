import { LayerGroup, Polyline, Popup } from "react-leaflet";
import { numberToDateString, numberToTimeString } from "./Helper";
import React from "react";

export class Person {
    constructor(name) {
        this.name = name;
    }

    polylines = [];
    name = "";
    /**
     * @type {Position[]}
     */
    positions = [];
    markers = [];
    problems = [];
    color;
    icons;
    oldMarkers = [];
    oldPolylines = [];

    update(state) {
        if (state.isShown === false) {
            this.oldMarkers = this.markers;
            this.oldPolylines = this.polylines;
            this.markers = [];
            this.polylines = [];
            return;
        }
        if (state.isShown === true && this.oldMarkers.length !== 0) {
            this.markers = this.oldMarkers;
            this.polylines = this.oldPolylines;
            this.oldMarkers = [];
            this.oldPolylines = [];
            return;
        }

        let lastPos = null;
        let tmpPolyline = [];
        let pos;
        this.markers = [];
        this.polylines = [];
        this.problems = [];
        if (!state.isShown) return;

        for (pos of this.positions) {
            if (!this.checkDate(pos, state)) continue;

            let problem = false;
            if (lastPos && this.checkProblem(pos, lastPos)) {
                this.insertPolyline(tmpPolyline, pos);
                tmpPolyline = [
                    [lastPos.lt, lastPos.lg],
                    [pos.lt, pos.lg],
                ];
                this.insertPolyline(tmpPolyline, pos, "b", true, lastPos);
                tmpPolyline = [];
                problem = true;
                this.problems.push([pos, lastPos]);
            }

            tmpPolyline.push([pos.lt, pos.lg]);
            this.markers.push(pos.getMarker(problem, this.name, this.icons));
            lastPos = pos;
        }
        this.insertPolyline(tmpPolyline, pos, "c");
    }

    getLayerGroup() {
        return (
            <LayerGroup key={this.name}>
                {this.markers}
                {this.polylines}
            </LayerGroup>
        );
    }

    /**
     * checks if the time differance between two positions is more than 2 hours
     * @param {Position} position the more recent position
     * @param {Position} lastPos the previous position
     * @return {Boolean} if there's a problem return true, false otherwise
     */
    checkProblem(position, lastPos) {
        // combines pos.DA and pos.TI to make a Date object
        let posDate = new Date(
            numberToDateString(position.date, 1) +
                " " +
                numberToTimeString(position.time)
        );
        let lastPosDate = new Date(
            numberToDateString(lastPos.date, 1) +
                " " +
                numberToTimeString(lastPos.time)
        );

        //diff contains the difference between the two positions in milliseconds
        let diff = lastPosDate - posDate;
        // contains the difference in minutes
        diff = diff / 1000 / 60;
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
    insertPolyline(
        tmpPolyline,
        pos,
        ref = "a",
        problem = false,
        lastPos = null
    ) {
        /** if array contains less than one item than it can't form a polyline */
        if (tmpPolyline.length <= 1) return;

        let obj, text;
        /** generates obj which contains information about the type of line
         * and text which is the inner text if the popup
         */
        if (problem) {
            obj = { color: "red", dashArray: "20,20" };
            text = (
                <span>
                    <center>{this.name}</center>({pos.lt} , {pos.lg} ) => (
                    {lastPos.lt} , {lastPos.lg})
                    <br />
                    {"(" +
                        numberToDateString(pos.date) +
                        " , " +
                        numberToTimeString(pos.time) +
                        ") => (" +
                        numberToDateString(lastPos.date) +
                        " , " +
                        numberToTimeString(lastPos.time) +
                        ")"}
                </span>
            );
        } else {
            obj = { color: this.color };
            text = <center>{this.name}</center>;
        }

        /** creates the Polyline and pushes it to the array */
        this.polylines.push(
            <Polyline
                key={pos.id + ref}
                pathOptions={obj}
                positions={tmpPolyline}
            >
                <Popup>{text}</Popup>
            </Polyline>
        );
    }

    checkDate(pos, state) {
        let date = new Date(numberToDateString(pos.date, 1));
        return state.startDate <= date && date <= state.endDate;
    }
}
