import { Component } from "react";
import Filter from "./Filter";

class PersonPanel extends Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <Filter
                    isChecked={this.props.checked}
                    name={this.props.name}
                    togglePerson={this.props.togglePerson}
                />
                <span>{this.props.name}</span>
            </div>
        );
    }
}

export default PersonPanel;
