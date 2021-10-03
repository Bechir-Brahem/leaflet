import React, {Component} from "react";
import axios from "axios";
import Map from "./Map";
import {Container, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RightPanel from "./RightPanel";
import {Color, generateBoatIcon, numberToDateString, numberToTimeString, popupText} from "../classes/Helper";
import {LayerGroup, Marker, Polyline, Popup} from "react-leaflet";
Date.prototype.yyyymmdd = function() {
    const mm = this.getMonth() + 1; // getMonth() is zero-based
    const dd = this.getDate();

    return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

let boatIcons = {};
const MyMarker = (props) => {
    console.log(44)
    const pos = props.pos;
    let coordinates = [pos.LT, pos.LG];
    return (
        <Marker
            key={pos.ID}
            position={coordinates}
            icon={props.problem ? boatIcons[pos.NA][1] : boatIcons[pos.NA][0]}
            riseOnHover={true}
            // zIndexOffset={props.problem?20:0}
        >
            <Popup>
                <p dangerouslySetInnerHTML={{__html: popupText(pos)}}/>
            </Popup>
        </Marker>
    );
};

class App extends Component {
    state = {
        layerGroups: {},
        problems: {},
    };

    /**
     * checks if the time differance between two positions is more than 2 hours
     * @param {Object} position the more recent position
     * @param {Object} lastPos the previous position
     * @return {Boolean} if there's a problem return true, false otherwise
     */
    checkProblem(position, lastPos) {
        // combines pos.DA and pos.TI to make a Date object
        let posDate = new Date(numberToDateString(position.DA, 1) + " " + numberToTimeString(position.TI));
        let lastPosDate = new Date(numberToDateString(lastPos.DA, 1) + " " + numberToTimeString(lastPos.TI));

        //diff contains the difference between the two positions in milliseconds
        let diff = lastPosDate - posDate;
        // contains the difference in minutes
        diff = diff / 1000 / 60
        return diff > 120;


    }

    /**
     * takes a list of coordinates and inserts Polyline component to the specified layerGroup
     * @param layerGroups
     * @param pos current position
     * @param tmpPolyline array containing coordinates
     * @param ref a variable used to make sure that keys are unique
     * @param problem is the current polyline in a state of a problem?
     * @param lastPos last position
     */
    insertPolyline(layerGroups, pos, tmpPolyline, ref = "a", problem = false, lastPos = []) {
        /** if array contains less than one item than it can't form a polyline */
        if (tmpPolyline.length <= 1) return;

        let obj, text
        /** generates obj which contains information about the type of line
         * and text which is the inner text if the popup
         */
        if (problem) {
            obj = {color: 'red', dashArray: "20,20"}
            text = <span>
                <center>{pos.NA}</center>
                ({pos.LT} , {pos.LG} ) => ({lastPos.LT} , {lastPos.LG})
                <br/>
                {"(" + numberToDateString(pos.DA) + " , " + numberToTimeString(pos.TI) +
                ") => ("
                + numberToDateString(lastPos.DA) + " , " + numberToTimeString(lastPos.TI) + ")"}
            </span>

        } else {
            obj = {color: layerGroups[pos.NA].color};
            text = <center>{pos.NA}</center>;
        }

        /** creates the Polyline and pushes it to its specific layerGroup */
        layerGroups[pos.NA].polylines.push(
            <Polyline
                key={pos.ID + ref}
                pathOptions={obj}
                positions={tmpPolyline}>
                <Popup>
                    {text}
                </Popup>
            </Polyline>
        );

    }

    checkDate(layerGroups, pos) {
        return layerGroups[pos.NA].startDate <= new Date(numberToDateString(pos.DA, 1)) <= layerGroups[pos.NA].endDate;
    }

    componentDidMount() {
        axios.get("/api").then((res) => {
            // layerGroups obj holds markers and polyliens for each person, the person's name being the key
            let layerGroups = {};
            let newVal = true;
            // color generator to generate each person's color
            let colorGen = new Color();
            let lastPos = [];
            // array containing the positions that will construct the polylines for each person
            let tmpPolyline = [];
            let pos
            let problem = false;
            let problems = {};
            /** add markers and polylines**/
            // iterate through positions fetched from the db
            for (pos of res.data) {
                problem = false;
                // layerGroups has already the name of the person as a key
                if (layerGroups[pos.NA] && this.checkDate(layerGroups, pos)) {
                    // create the current position object
                    let curPos = [pos.LT, pos.LG]

                    /** problem **/
                    // if There's a problem with the current position and the last one
                    if (this.checkProblem(pos, lastPos) && !newVal) {
                        // create the polyline that contains all the previous legitimate positions
                        // until we found the problem, all positions are colored in the person's color
                        // all those positions are stored in the tmpPolyline array
                        this.insertPolyline(layerGroups, pos, tmpPolyline)
                        // clear tmpPolyline from previous positions since the polyline containg them has
                        // already been created and replace them with the current and last positions
                        tmpPolyline = [[lastPos.LT, lastPos.LG], curPos];
                        // add the red dashed polyline representing the problem
                        this.insertPolyline(layerGroups, pos, tmpPolyline, "b", true, lastPos)
                        // clear  the tmpPoyline so we can add the next positions later
                        tmpPolyline = [];
                        problem = true;

                        if (!problems[pos.NA]) {
                            problems[pos.NA] = [];
                        }

                        problems[pos.NA].push([pos, lastPos])

                    }

                    // add a new marker to the person
                    layerGroups[pos.NA].markers.push(
                        <MyMarker key={pos.ID} pos={pos} color={layerGroups[pos.NA].color} problem={problem}/>
                    );
                    // push the current position to tmpPolyline array
                    tmpPolyline.push(curPos);
                    newVal = false;


                } else {
                    // this person hasn't been registred in the object yet

                    // create the polyline containg the positions of the last person that
                    // haven't been placed in a polyline yet
                    this.insertPolyline(layerGroups, lastPos, tmpPolyline, "c")
                    // initialize tmpPolyline for this person with his first poisition
                    tmpPolyline = [[pos.LT, pos.LG]];
                    // get the next color available which will be this person's color
                    let color = colorGen.getNext();
                    // initialize this person's layerGroup object which will hold:
                    // the person's color, markers, polylines, and boolean variable to toggle the layerGroup's appearance
                    layerGroups[pos.NA] = {
                        color,
                        markers: [],
                        polylines: [],
                        isShown: true,
                        startDate: new Date("2021-01-01"),
                        endDate: new Date("2030-01-01")
                    };
                    if (this.checkDate(layerGroups, pos)) {
                        layerGroups[pos.NA].markers.push(<MyMarker key={pos.ID} pos={pos} color={color}/>)
                    }
                    boatIcons[pos.NA] = [generateBoatIcon(color), generateBoatIcon(color, "red")]
                    newVal = true

                }
                // update the lastPos
                lastPos = pos
            }

            this.insertPolyline(layerGroups, pos, tmpPolyline, "d")

            // map the layerGroups object: transform the markers and polylines of each person
            // to one layerGroup grouping them all, and leave the isShown attribute as it is
            for (let name in layerGroups) {
                layerGroups[name] = {
                    layerGroup: (
                        <LayerGroup key={name}>
                            {layerGroups[name].markers}
                            {layerGroups[name].polylines}
                        </LayerGroup>
                    ),
                    isShown: layerGroups[name].isShown,
                    startDate: new Date("2021-01-01"),
                    endDate: new Date("2022-01-01")
                };
            }
            // layerGroups object is now ready to be published in state
            this.setState({
                layerGroups: layerGroups,
                problems: problems
            });
        });
    }

    /**
     * The filter event handler function that shows or hides the layerGroup of one person
     * @param {string} name the name of the person to hide or show
     */
    togglePerson(name) {
        let tmp = Object.assign({}, this.state.layerGroups);
        tmp[name].isShown = !tmp[name].isShown;
        this.setState({layerGroups: tmp});
    }

    setDate(name, type, a) {
        let tmp = Object.assign({}, this.state.layerGroups);
        if (type === 0)
            tmp[name].startDate = new Date(a);
        else
            tmp[name].endDate = new Date(a);
        this.setState({layerGroups: tmp})


    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Map layerGroups={this.state.layerGroups}/>
                    </Row>
                    <Row style={{padding: "0!important"}}>
                        <RightPanel
                            layerGroups={this.state.layerGroups}
                            togglePerson={this.togglePerson.bind(this)}
                            setDate={this.setDate.bind(this)}
                            problems={this.state.problems}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
