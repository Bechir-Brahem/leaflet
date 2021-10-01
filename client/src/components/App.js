import React, {Component} from "react";
import axios from "axios";
import Map from "./Map";
import {Col, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RightPanel from "./RightPanel";
import {Color, generateBoatIcon, popupText} from "../classes/Helper";
import {LayerGroup, Marker, Polyline, Popup} from "react-leaflet";

const MyMarker = (props) => {
    const pos = props.pos;
    let boatIcon = generateBoatIcon(props.color);
    let coordinates = [pos.LT, pos.LG];
    return (
        <Marker key={pos.ID} position={coordinates} icon={boatIcon}>
            <Popup>
                <p dangerouslySetInnerHTML={{__html: popupText(pos)}}></p>
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
            let layerGroups = {};
            let colorGen = new Color();
            let lastPos = [];
            let tmpPolyline = [];
            let pos
            /** add markers and polylines**/
            for (pos of res.data) {
                if (layerGroups[pos.NA]) {
                    layerGroups[pos.NA].markers.push(
                        <MyMarker key={pos.ID} pos={pos} color={layerGroups[pos.NA].color}/>
                    );
                    let curPos = [pos.LT, pos.LG]
                    if (this.checkProblem(pos, lastPos)) {
                        layerGroups[pos.NA].polylines.push(
                            <Polyline
                                key={pos.ID}
                                pathOptions={{color: layerGroups[pos.NA].color}}
                                positions={tmpPolyline}
                            />
                        );

                        tmpPolyline = [[lastPos.LT, lastPos.LG], curPos];
                        layerGroups[pos.NA].polylines.push(
                            <Polyline key={pos.ID + "a"}
                                      pathOptions={{color: 'red', dashArray: "20,20"}}
                                      positions={tmpPolyline}
                            />)
                        tmpPolyline = [];
                    }
                    tmpPolyline.push(curPos);
                    lastPos = pos;


                } else {
                    if (tmpPolyline.length > 1) {
                        layerGroups[lastPos.NA].polylines.push(
                            <Polyline
                                key={pos.ID + "b"}
                                pathOptions={{color: layerGroups[lastPos.NA].color}}
                                positions={tmpPolyline}
                            />
                        );
                    }
                    tmpPolyline = [[pos.LT, pos.LG]];
                    let color = colorGen.getNext();
                    layerGroups[pos.NA] = {
                        color,
                        markers: [<MyMarker pos={pos} color={color}/>],
                        polylines: [],
                        isShown: true,
                    };
                }
            }

            layerGroups[pos.NA].polylines.push(
                <Polyline
                    key={pos.ID + "x"}
                    pathOptions={{color: layerGroups[pos.NA].color}}
                    positions={tmpPolyline}
                />
            );
            tmpPolyline = [];


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
            this.setState({layerGroups});
        });
    }

    togglePerson(name) {
        let tmp = Object.assign({}, this.state.layerGroups);
        tmp[name].isShown = !tmp[name].isShown;
        this.setState({layerGroups: tmp});
    }

    render() {
        return (
            <div>
                <Row>
                    <Col lg={8} md={12}>
                        {/* <Map people={this.state.people} /> */}
                        <Map layerGroups={this.state.layerGroups}/>
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
