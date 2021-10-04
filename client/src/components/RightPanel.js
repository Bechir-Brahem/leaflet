import {Component} from "react";
import PersonPanel from "./PersonPanel";

class RightPanel extends Component {
    render() {
        let {peopleState} = this.props;
        let {problems}=this.props
        return (
            <div style={{
                overflowY: 'scroll',
                height: '70vh',
            }}>
                {Object.keys(peopleState).map((key) => (
                    <PersonPanel
                        key={key}
                        name={key}
                        checked={peopleState[key].isShown}
                        startDate={peopleState[key].startDate}
                        endDate={peopleState[key].endDate}
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
