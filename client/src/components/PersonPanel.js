import {Component} from "react";
import Filter from "./Filter";

class PersonPanel extends Component {
    render() {
        return (
            <div style={{display: "flex"}}>
                <Filter isChecked={this.props.checked} toggleF={this.props.toggleF}/>
                <span>{this.props.name}</span>

            </div>
        )
    }
}

export default PersonPanel;