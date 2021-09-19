import React, {Component} from 'react';
import axios from "axios";
import Map from './Map'
import Person from '../classes/Person'
import {Col, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import RightPanel from './RightPanel'
import PersonInfo from "../classes/PersonInfo";
import {Color} from "../classes/Helper";


class App extends Component {
    state = {
        people: [],
        rightPanel: [],
    };

    toggleFunctions=[];

    componentDidMount() {
        axios.get(`/api`)
            .then(res => {
                let colorGen=new Color();
                let lastName = "";
                let people = [];
                let cnt = -1;
                res.data.forEach((position, index) => {
                    if (lastName !== position.NA) {
                        let tmpPerson = new Person()
                        tmpPerson.color=colorGen.getNext()
                        tmpPerson.name = position.NA;
                        cnt++;
                        lastName = tmpPerson.name;
                        people.push(tmpPerson)
                    }
                    people[cnt].positions.push(position);
                })
                let peopleInfo = [];
                people.forEach((person,index) => {
                    let tmp = new PersonInfo(person.name, true, person.positions[0].DA, person.positions[person.positions.length - 1].DA);
                    peopleInfo.push(tmp);

                })
                people.forEach((p,index)=>{
                    this.toggleFunctions.push(()=>{
                        let tmpPeople=this.state.people.slice();
                        let tmpPeopleInfo=this.state.rightPanel.slice();
                        tmpPeople[index].isShown=!tmpPeople[index].isShown;
                        tmpPeopleInfo[index].isShown=!tmpPeopleInfo[index].isShown;
                        this.setState({people:tmpPeople,rightPanel:tmpPeopleInfo});


                    })
                })
                this.setState({
                    people: people,
                    rightPanel: peopleInfo
                })
            })
    }


    render() {
        return (
            <div>
                <Row>
                    <Col lg={8} md={12}>
                        <Map people={this.state.people}/>
                    </Col>
                    <Col lg={4} md={12}>
                        <RightPanel peeps={this.state.rightPanel} togglers={this.toggleFunctions}/>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default App;
