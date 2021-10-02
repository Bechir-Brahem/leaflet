import {Component} from "react";
import Filter from "./Filter";
import Info from "./Info";

class PersonPanel extends Component {
    render() {
        return (
            <div style={{}}>
                <div style={{display: "flex"}}>
                    <Filter
                        isChecked={this.props.checked}
                        name={this.props.name}
                        togglePerson={this.props.togglePerson}
                    />
                    <span>{this.props.name}</span>
                </div>
                <Info problems={this.props.problems}/>


            </div>
        );
    }
}

export default PersonPanel;
