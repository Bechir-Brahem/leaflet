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
                        isShown={this.props.isShown}
                        isAllPos={this.props.allPos}
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        name={this.props.name}

                        togglePerson={this.props.togglePerson}
                        toggleAllPos={this.props.toggleAllPos}
                        setDate={this.props.setDate}
                         posCount={this.props.posCount}

                    />
                </div>
                <Info problems={this.props.problems}
                sos={this.props.sos}


                />


            </div>
        );
    }
}

export default PersonPanel;
