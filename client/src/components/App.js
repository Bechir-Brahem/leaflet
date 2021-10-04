import React, {Component} from "react";
import axios from "axios";
import Map from "./Map";
import {Container, Row} from "react-bootstrap";
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
                            startDate: new Date("2021-01-01"),
                            endDate: new Date("2022-01-01"),
                        }

                    }
                    people[pos.na].positions.push(new Position(pos))
                }
                console.log(people)
                Object.values(people).map(person => person.update({
                    isShown: true,
                    startDate: new Date("2021-01-01"),
                    endDate: new Date("2022-01-01"),
                }))
                this.setState({peopleState: peopleState})
            }
        )

    }

    /**
     * The filter event handler function that shows or hides the layerGroup of one person
     * @param {String} name the name of the person to hide or show
     */
    togglePerson(name) {
        console.log(name)
        let tmp = Object.assign({}, this.state.peopleState);
        tmp[name].isShown = !tmp[name].isShown;

        people[name].update(tmp[name]);
        this.setState({peopleState: tmp});
    }

    setDate(name, type, a) {
        let tmp = Object.assign({}, this.state.peopleState);
        if (type === 0)
            tmp[name].startDate = new Date(a);
        else
            tmp[name].endDate = new Date(a);
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
        Object.values(people).map((person) => {
            problems[person.name] = person.problems
        })


        return (
            <div>
                <Container>
                    <Row>
                        <Map people={people} peopleState={this.state.peopleState}/>
                    </Row>
                    <Row style={{padding: "0!important"}}>
                        <RightPanel
                            peopleState={peopleState}
                            togglePerson={this.togglePerson.bind(this)}
                            setDate={this.setDate.bind(this)}
                            problems={problems}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
