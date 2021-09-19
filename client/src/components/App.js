import React, {Component} from 'react';
import axios from "axios";
import Map from './Map'
import Person from '../classes/Person'

class App extends Component {
    state = {
        people: [],
        // peopleProblems: [
        //     {
        //         name: "amira",
        //         problems: []
        //     }
        // ]
    };

    componentDidMount() {
        axios.get(`/api`)
            .then(res => {
                let lastName = "";
                let people = [];
                let cnt = -1;
                res.data.forEach((position, index) => {
                    if (lastName !== position.NA) {
                        let tmpPerson = new Person()
                        tmpPerson.name = position.NA;
                        cnt++;
                        lastName = tmpPerson.name;
                        people.push(tmpPerson)
                    }
                    people[cnt].positions.push(position);
                })
                this.setState({people: people});
            })
    }


    render() {
        return (
            <div>
                <Map people={this.state.people}/>
            </div>
        );
    }
}

export default App;
