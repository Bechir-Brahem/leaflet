import {Component} from "react";
import PersonPanel from "./PersonPanel";

class RightPanel extends Component {
    render() {
        let {peopleState} = this.props;
        let {problems}=this.props
        return (
            <div style={{
                overflowY: 'scroll',
                height: '100vh',
            }}>
                {Object.keys(peopleState).map((key) => (
                    <PersonPanel
                        key={key}
                        name={key}
                        isShown={peopleState[key].isShown}
                        allPos={peopleState[key].allPos}
                        startDate={peopleState[key].startDate}
                        endDate={peopleState[key].endDate}
                        togglePerson={this.props.togglePerson}
                        toggleAllPos={this.props.toggleAllPos}
                        setDate={this.props.setDate}
                        problems={problems[key]}
                        sos={this.props.sos[key]}
                        posCount={this.props.posCount[key]}
                    />
                ))}
            </div>
        );
    }
}

export default RightPanel;
