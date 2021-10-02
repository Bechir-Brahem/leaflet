import {Component} from "react";
import Filter from "./Filter";
import Info from "./Info";

class PersonPanel extends Component {
    render() {
        return (
            <div style={{
                padding: "10px 3px",
                border: "2px #7e8182 solid",
                marginTop: "4px"

            }}>
                <div>
                    <Filter
                        isChecked={this.props.checked}
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        name={this.props.name}
                        togglePerson={this.props.togglePerson}
                        setDate={this.props.setDate}
                    />
                </div>
                <Info problems={this.props.problems}/>


            </div>
        );
    }
}

export default PersonPanel;
