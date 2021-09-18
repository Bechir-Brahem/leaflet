import React, {Component} from 'react';
import axios from "axios";
import Map from './Map'

class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        axios.get(`/api`)
            .then(res => {
                this.setState(res.data);
            })
    }


    render() {
        return (
            <div>
                <h1>Welcome to React</h1>
                <p>{this.state.data}</p>
                <Map />
            </div>
        );
    }
}

export default App;
