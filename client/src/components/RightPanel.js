import {Component} from "react";
import PersonPanel from "./PersonPanel";

class RightPanel extends Component {
    render() {
        let {layerGroups, problems} = this.props;
        return (
            <div style={{
                overflowY: 'scroll',
                height: '70vh'
            }}>
                {Object.keys(layerGroups).map((key) => (
                    <PersonPanel
                        key={key}
                        name={key}
                        checked={layerGroups[key].isShown}
                        togglePerson={this.props.togglePerson}
                        problems={problems[key]}
                    />
                ))}
            </div>
        );
    }
}

export default RightPanel;
