import React, {Component} from "react";
import axios from "axios";
import Map from "./Map";
import {Col, Container, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RightPanel from "./RightPanel";
import {Color, generateBoatIcon, numberToDateString, numberToTimeString, popupText} from "../classes/Helper";
import {LayerGroup, Polyline,Marker,  Popup} from "react-leaflet";

let boatIcons={};
const MyMarker = (props) => {
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

    checkProblem(position, lastPos) {
        let posDate=new Date(numberToDateString(position.DA,1)+" "+numberToTimeString(position.TI));
        let lastPosDate=new Date(numberToDateString(lastPos.DA,1)+" "+numberToTimeString(lastPos.TI));

        let diff=lastPosDate-posDate;
        diff=diff/1000/60
        return diff > 120;


    }

    insertPolyline(layerGroups, pos, tmpPolyline, ref = "a", problem = false,lastPos=[]) {
        if (tmpPolyline.length <= 1) return;

        let obj,text
        if (problem) {
            obj = {color: 'red', dashArray: "20,20"}
            text=<span>
                <center>{pos.NA}</center>
                ({pos.LT} ,  {pos.LG} ) => ({lastPos.LT} , {lastPos.LG})
                <br/>
                {"("+numberToDateString(pos.DA) + " , "+numberToTimeString(pos.TI)+
                ") => ("
                +numberToDateString(lastPos.DA)+" , "+numberToTimeString(lastPos.TI)+")"}
            </span>

        } else {
            obj = {color: layerGroups[pos.NA].color};
            text=<center>{pos.NA}</center>;
        }
        layerGroups[pos.NA].polylines.push(
            <Polyline
                key={pos.ID + ref}
                pathOptions={obj}
                positions={tmpPolyline} >
                <Popup>
                    {text}
                </Popup>
            </Polyline>
        );

    }

    componentDidMount() {
        axios.get("/api").then((res) => {
            let layerGroups = {};
            let newVal=true;
            let colorGen = new Color();
            let lastPos = [];
            let tmpPolyline = [];
            let pos
            let problem = false;
            let problems={};
            /** add markers and polylines**/
            for (pos of res.data) {
                problem = false;
                if (layerGroups[pos.NA]) {
                    let curPos = [pos.LT, pos.LG]

                    /** problem **/
                    if (this.checkProblem(pos, lastPos) && !newVal) {
                        this.insertPolyline(layerGroups, pos, tmpPolyline)
                        tmpPolyline = [[lastPos.LT, lastPos.LG], curPos];
                        this.insertPolyline(layerGroups, pos, tmpPolyline, "b", true,lastPos)
                        tmpPolyline = [];
                        problem = true;

                        if(!problems[pos.NA]){
                            problems[pos.NA]=[];
                        }

                        problems[pos.NA].push([pos,lastPos])

                    }

                    layerGroups[pos.NA].markers.push(
                        <MyMarker key={pos.ID} pos={pos} color={layerGroups[pos.NA].color} problem={problem}/>
                    );
                    tmpPolyline.push(curPos);
                    newVal=false;


                } else {

                    this.insertPolyline(layerGroups, lastPos, tmpPolyline, "c")
                    tmpPolyline = [[pos.LT, pos.LG]];
                    let color = colorGen.getNext();
                    layerGroups[pos.NA] = {
                        color,
                        markers: [<MyMarker key={pos.ID} pos={pos} color={color}/>],
                        polylines: [],
                        isShown: true,
                    };
                    boatIcons[pos.NA]=[generateBoatIcon(color),generateBoatIcon(color,"red")]
                    newVal=true

                }

                lastPos=pos
            }

            this.insertPolyline(layerGroups, pos, tmpPolyline, "d")


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
            console.log(problems)
            this.setState({
                layerGroups:layerGroups,
                problems:problems
            });
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
                <Container>
                    <Row>
                        <Map layerGroups={this.state.layerGroups}/>
                    </Row>
                    <Row>
                        <RightPanel
                            layerGroups={this.state.layerGroups}
                            togglePerson={this.togglePerson.bind(this)}
                            problems={this.state.problems}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
