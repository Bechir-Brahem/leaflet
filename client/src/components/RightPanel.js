import { Component } from "react";
import PersonPanel from "./PersonPanel";

class RightPanel extends Component {
    // render() {
    //     let personList = this.props.peeps.map((person, index) => {
    //         return (
    //             <PersonPanel
    //                 key={person.name}
    //                 index={index}
    //                 name={person.name}
    //                 checked={person.isShown}
    //                 togglePerson={this.props.togglePerson}
    //             />
    //         );
    //     });

    //     return <div>{personList}</div>;
    // }
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
