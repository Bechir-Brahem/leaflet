import React, {Component} from "react";
import axios from "axios";
import Map from "./Map";
import {Col, Container, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Color, generateBoatIcon} from "../classes/Helper";
import {Position} from "../classes/Position";
import {Person} from "../classes/Person";
import RightPanel from "./RightPanel";

Date.prototype.yyyymmdd = function () {
    const mm = this.getMonth() + 1; // getMonth() is zero-based
    const dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};

export let usefulValues = [];

let peopleState = [];
let people = [];

class App extends Component {
    state = {
        peopleState: []
    }


    componentDidMount() {
        console.log("start ComponentDidMount", Date.now())
        axios.get("/api").then((res) => {
                // people = []
                console.log("start axios", Date.now())
                let colorGen = new Color();
                for (let pos of res.data) {
                    if (people[pos.na] === undefined) {
                        people[pos.na] = new Person(pos.na)
                        let color = colorGen.getNext()

                        people[pos.na].icons = [generateBoatIcon(color), generateBoatIcon(color, "red")];
                        people[pos.na].color = color

                        peopleState[pos.na] = {
                            isShown: true,
                            allPos: false,
                            startDate: new Date("2021-01-01"),
                            endDate: new Date("2022-01-01"),
                        }

                    }
                    people[pos.na].positions.push(new Position(pos))
                }
                Object.values(people).map(person => person.update(peopleState[person.name]))
                this.setState({peopleState: peopleState})
            }
        )

    }

    /**
     * The filter event handler function that shows or hides the layerGroup of one person
     * @param {String} name the name of the person to hide or show
     */
    togglePerson(name) {
        let tmp = Object.assign({}, this.state.peopleState);
        tmp[name].isShown = !tmp[name].isShown;
        people[name].layerGroup.remove();
        people[name].undrawSOS();

        this.setState({peopleState: tmp});
    }

    toggleAllPos(name) {
        let tmp = Object.assign({}, this.state.peopleState);
        tmp[name].allPos = !tmp[name].allPos;
        people[name].layerGroup.remove();

        this.setState({peopleState: tmp});
    }

    setDate(name, type, a) {
        let tmp = Object.assign({}, this.state.peopleState);
        if (type === 0)
            tmp[name].startDate = new Date(a);
        else
            tmp[name].endDate = new Date(a);
        people[name].layerGroup.remove();
        people[name].undrawSOS();
        people[name].update(tmp[name])
        this.setState({layerGroups: tmp})


    }

    render() {
        console.log("start render", Date.now())
        /**
         *
         * @type {Person[]}
         */
        let problems = [];
        let sos = [];
        let posCount=[];
        Object.values(people).forEach((person) => {
            problems[person.name] = person.problems
            let tmp = [];
            tmp = person.allSOS.map(arr => arr[1])
            sos[person.name] = tmp;
            posCount[person.name]=person.markers.length;
        })


        return (
            <div>
                <Container fluid={true}>
                    <Row>
                        <Col lg={8} md={12}>
                            <Map people={people} peopleState={this.state.peopleState}/>
                        </Col>
                        <Col lg={4} md={12}>
                            <RightPanel
                                peopleState={peopleState}
                                togglePerson={this.togglePerson.bind(this)}
                                setDate={this.setDate.bind(this)}
                                toggleAllPos={this.toggleAllPos.bind(this)}
                                problems={problems}
                                sos={sos}
                                posCount={posCount}
                            />

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
