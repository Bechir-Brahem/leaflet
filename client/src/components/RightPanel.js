import { Component } from "react";
import PersonPanel from "./PersonPanel";

class RightPanel extends Component {
    render() {
        let { layerGroups } = this.props;
        return (
            <div>
                {Object.keys(layerGroups).map((key) => (
                    <PersonPanel
                        key={key}
                        name={key}
                        checked={layerGroups[key].isShown}
                        togglePerson={this.props.togglePerson}
                    />
                ))}
            </div>
        );
    }
}

export default RightPanel;
