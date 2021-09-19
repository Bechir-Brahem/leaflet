import {Component} from "react";
import PersonPanel from "./PersonPanel";

class RightPanel extends Component {
    render() {
        let personList=this.props.peeps.map((person,index)=>{
            return (
                <PersonPanel key={person.name} name={person.name} checked={person.isShown} toggleF={this.props.togglers[index]} />
            )
        })

        return (
            <div>
                {personList}

            </div>
        );
    }
}

export default RightPanel;
