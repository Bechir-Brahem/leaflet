import { Component } from "react";
import Filter from "./Filter";

// function MyFilter(props) {
//     return (
//         <div>
//             <input
//                 type="checkbox"
//                 id="check"
//                 checked={props.checked}
//                 onChange={() => {
//                     props.togglePerson(props.index);
//                 }}
//             />
//             <label htmlFor="check">{props.name}</label>
//         </div>
//     );
// }

class PersonPanel extends Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <Filter
                    isChecked={this.props.checked}
                    index={this.props.index}
                    togglePerson={this.props.togglePerson}
                />
                <span>{this.props.name}</span>
            </div>
            // <MyFilter
            //     checked={this.props.checked}
            //     name={this.props.name}
            //     togglePerson={this.props.togglePerson}
            //     index={this.props.index}
            // />
        );
    }
}

export default PersonPanel;
