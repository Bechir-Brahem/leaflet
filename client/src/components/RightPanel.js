import {Component} from "react";
import PersonPanel from "./PersonPanel";

class RightPanel extends Component {
    render() {
        let {layerGroups, problems} = this.props;
        return (
            <div style={{
                overflowY: 'scroll',
                height: '70vh',
            }}>
                {Object.keys(layerGroups).map((key) => (
                    <PersonPanel
                        key={key}
                        name={key}
                        checked={layerGroups[key].isShown}
                        startDate={layerGroups[key].startDate}
                        endDate={layerGroups[key].endDate}
                        togglePerson={this.props.togglePerson}
                        setDate={this.props.setDate}
                        problems={problems[key]}
                    />
                ))}
            </div>
        );
    }
}

export default RightPanel;
