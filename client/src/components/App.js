import React, { Component } from "react";
import axios from "axios";
import Map from "./Map";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RightPanel from "./RightPanel";
import { Color, generateBoatIcon, popupText } from "../classes/Helper";
import { LayerGroup, Marker, Polyline, Popup } from "react-leaflet";

const MyMarker = (props) => {
    const pos = props.pos;
    let boatIcon = generateBoatIcon(props.color);
    let coordinates = [pos.LT, pos.LG];
    return (
        <Marker key={pos.ID} position={coordinates} icon={boatIcon}>
            <Popup>
                <p dangerouslySetInnerHTML={{ __html: popupText(pos) }}></p>
            </Popup>
        </Marker>
    );
};

class App extends Component {
    state = {
        // people: [],
        // rightPanel: [],
        layerGroups: [],
    };

    /**
     * checks if the time differance between two positions is more than 2 hours
     * @param {Object} position the more recent position
     * @param {Object} lastPos the previous position
     * @return {Boolean} if there's a problem return true, false otherwise
     */
    checkProblem(position, lastPos) {
        if (lastPos.DA === position.DA) {
            if (position.TI - lastPos.TI > 200) return true;
        } else {
            //TODO: check the date
            //this code returns a wrong value if we are on different dates (more than one day)
            //and the difference between times is 100 (1 hour)
            //HINT: i can use Date object
            if ("2400" - lastPos.TI + parseInt(position.TI) > 200) return true;
        }
        return false;
    }

    componentDidMount() {
        axios.get("/api").then((res) => {
            // layerGroups obj holds markers and polyliens for each person, the person's name being the key
            let layerGroups = {};
            // color generator to generate each person's color
            let colorGen = new Color();
            let lastPos = {};
            // array containing the positions that will construct the polylines for each person
            let tmpPolyline = [];
            // declaring the pos variable
            let pos;
            /** add markers and polylines**/
            // iterate through positions fetched from the db
            for (pos of res.data) {
                // layerGroups has already the name of the person as a key
                if (layerGroups[pos.NA]) {
                    // add a new marker to the person
                    layerGroups[pos.NA].markers.push(
                        <MyMarker
                            key={pos.ID}
                            pos={pos}
                            color={layerGroups[pos.NA].color}
                        />
                    );
                    // create the current position object
                    let curPos = [pos.LT, pos.LG];
                    // if There's a problem with the current position and the last one
                    if (this.checkProblem(pos, lastPos)) {
                        // create the polyline that contains all the previous legitemate positions
                        // until we found the problem, all positions are colored in the person's color
                        // all those positions are stored in the tmpPolyline array
                        layerGroups[pos.NA].polylines.push(
                            <Polyline
                                key={pos.ID}
                                pathOptions={{
                                    // get the color of the person
                                    color: layerGroups[pos.NA].color,
                                }}
                                positions={tmpPolyline}
                            />
                        );

                        // clear tmpPolyline from previous positions since the polyline containg them has
                        // already been created and replace them with the current and last positions
                        tmpPolyline = [[lastPos.LT, lastPos.LG], curPos];
                        // add the red dashed polyline representing the problem
                        layerGroups[pos.NA].polylines.push(
                            <Polyline
                                key={pos.ID + "a"}
                                pathOptions={{
                                    color: "red",
                                    dashArray: "20,20",
                                }}
                                positions={tmpPolyline}
                            />
                        );
                        // clear  the tmpPoyline so we can add the next positions later
                        tmpPolyline = [];
                    }
                    // push the current position to tmpPolyline array
                    tmpPolyline.push(curPos);
                    // update the lastPos
                    lastPos = pos;
                } else {
                    // this person hasn't been registred in the object yet

                    // create the polyline containg the positions of the last person that
                    // haven't been placed in a polyline yet
                    if (tmpPolyline.length > 1) {
                        layerGroups[lastPos.NA].polylines.push(
                            <Polyline
                                key={pos.ID + "b"}
                                pathOptions={{
                                    color: layerGroups[lastPos.NA].color,
                                }}
                                positions={tmpPolyline}
                            />
                        );
                    }
                    // initialize tmpPolyline for this person with his first poisition
                    tmpPolyline = [[pos.LT, pos.LG]];
                    // get the next color available which will be this person's color
                    let color = colorGen.getNext();
                    // initialize this person's layerGroup object which will hold:
                    // the person's color, markers, polylines, and boolean variable to toggle the layerGroup's appearance
                    layerGroups[pos.NA] = {
                        color,
                        markers: [<MyMarker pos={pos} color={color} />],
                        polylines: [],
                        isShown: true,
                    };
                }
            }

            // add the polyline containing the last positions for the last person
            layerGroups[pos.NA].polylines.push(
                <Polyline
                    key={pos.ID + "x"}
                    pathOptions={{ color: layerGroups[pos.NA].color }}
                    positions={tmpPolyline}
                />
            );
            tmpPolyline = [];

            // map the layerGroups object: transform the markers and poylines of each person
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
                };
            }
            // layerGroups object is now ready to be published in state
            this.setState({ layerGroups });
        });
    }

    /**
     * The filter event handler function that shows or hides the layerGroup of one person
     * @param {string} name the name of the person to hide or show
     */
    togglePerson(name) {
        // changing state depending on the previous state needs the setState form that
        // takes a function instead of an object but this method didn't work soo fuck it
        let tmp = Object.assign({}, this.state.layerGroups);
        tmp[name].isShown = !tmp[name].isShown;
        this.setState({ layerGroups: tmp });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col lg={8} md={12}>
                        {/* <Map people={this.state.people} /> */}
                        <Map layerGroups={this.state.layerGroups} />
                    </Col>
                    <Col lg={4} md={12}>
                        {/* <RightPanel
                            peeps={this.state.rightPanel}
                            togglePerson={this.togglePerson.bind(this)}
                        /> */}
                        <RightPanel
                            layerGroups={this.state.layerGroups}
                            togglePerson={this.togglePerson.bind(this)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
