import React, { Component } from "react";
import axios from "axios";
import Map from "./Map";
import Person from "../classes/Person";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RightPanel from "./RightPanel";
import PersonInfo from "../classes/PersonInfo";
import { Color } from "../classes/Helper";
import { Marker, LayerGroup, Popup } from "react-leaflet";
import { generateBoatIcon, popupText } from "../classes/Helper";

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

    // toggleFunctions = [];

    // togglePerson(index) {
    //     let tmpPeople = [...this.state.people];
    //     let tmpPeopleInfo = [...this.state.rightPanel];
    //     tmpPeople[index].isShown = !tmpPeople[index].isShown;
    //     tmpPeopleInfo[index].isShown = !tmpPeopleInfo[index].isShown;
    //     this.setState({ people: tmpPeople, rightPanel: tmpPeopleInfo });
    //     this.setState((state) => {
    //         let tmpPeople = [...state.people];
    //         let tmpPeopleInfo = [...state.rightPanel];
    //         tmpPeople[index].isShown = !tmpPeople[index].isShown;
    //         tmpPeopleInfo[index].isShown = !tmpPeopleInfo[index].isShown;
    //         console.log({ people: tmpPeople, rightPanel: tmpPeopleInfo });
    //         return { people: tmpPeople, rightPanel: tmpPeopleInfo };
    //     });
    // }

    // componentDidMount() {
    //     axios.get(`/api`).then((res) => {
    //         console.log(res);
    //         let colorGen = new Color();
    //         let lastName = "";
    //         let people = [];
    //         let cnt = -1;
    //         res.data.forEach((position, index) => {
    //             if (lastName !== position.NA) {
    //                 let tmpPerson = new Person();
    //                 tmpPerson.color = colorGen.getNext();
    //                 tmpPerson.name = position.NA;
    //                 cnt++;
    //                 lastName = tmpPerson.name;
    //                 people.push(tmpPerson);
    //             }
    //             people[cnt].positions.push(position);
    //         });
    //         let peopleInfo = [];
    //         people.forEach((person, index) => {
    //             let tmp = new PersonInfo(
    //                 person.name,
    //                 true,
    //                 person.positions[0].DA,
    //                 person.positions[person.positions.length - 1].DA
    //             );
    //             peopleInfo.push(tmp);
    //         });
    //         // people.forEach((p, index) => {
    //         //     this.toggleFunctions.push(() => {
    //         //         let tmpPeople = this.state.people.slice();
    //         //         let tmpPeopleInfo = this.state.rightPanel.slice();
    //         //         tmpPeople[index].isShown = !tmpPeople[index].isShown;
    //         //         tmpPeopleInfo[index].isShown =
    //         //             !tmpPeopleInfo[index].isShown;
    //         //         this.setState({
    //         //             people: tmpPeople,
    //         //             rightPanel: tmpPeopleInfo,
    //         //         });
    //         //     });
    //         // });
    //         this.setState({
    //             people: people,
    //             rightPanel: peopleInfo,
    //         });
    //     });
    // }

    componentDidMount() {
        axios.get("/api").then((res) => {
            let layerGroups = {};
            let colorGen = new Color();
            for (let pos of res.data) {
                if (layerGroups[pos.NA]) {
                    layerGroups[pos.NA].markers.push(
                        <MyMarker pos={pos} color={layerGroups[pos.NA].color} />
                    );
                } else {
                    let color = colorGen.getNext();
                    layerGroups[pos.NA] = {
                        color,
                        markers: [<MyMarker pos={pos} color={color} />],
                        isShown: true,
                    };
                }
            }
            for (let name in layerGroups) {
                let obj = {
                    layerGroup: (
                        <LayerGroup key={name}>
                            {layerGroups[name].markers}
                        </LayerGroup>
                    ),
                    isShown: layerGroups[name].isShown,
                };
                layerGroups[name] = obj;
            }
            this.setState({ layerGroups });
        });
    }

    togglePerson(name) {
        this.state.layerGroups[name].isShown =
            !this.state.layerGroups[name].isShown;
        this.setState(this.state);
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
