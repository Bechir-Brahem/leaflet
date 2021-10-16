import {Component} from "react";
import PersonPanel from "./PersonPanel";
import debounce from "lodash.debounce";

class RightPanel extends Component {
    invalidateMap = debounce(() => this.props.map.invalidateSize(), 500);
    setMargin = debounce((e) => document.getElementById("cont").style.marginTop = e.clientY - 20 + "px", 100)
    isToggled = false;

    render() {
        let {widths,problems,peopleState}=this.props;
        let mapW=widths[0];
        let rightW=widths[1];
        return (

            <div style={{display: "flex"}}>
                <div id="a" style={{width: "5vw"}}
                     onClick={() => {
                         if (!this.isToggled) {
                             document.getElementById("personPanelDiv").style.width = "0";
                             document.getElementById("mapDiv").style.width = "95vw"
                             document.getElementById("rightPanelDiv").style.width = "5vw"
                         } else {
                             document.getElementById("personPanelDiv").style.width = "100%";
                             document.getElementById("mapDiv").style.width = mapW
                             document.getElementById("rightPanelDiv").style.width = rightW
                         }
                         document.getElementById("arrows").classList.toggle("rotate")
                         console.log("**************************\n", this.props.map)
                         this.invalidateMap()
                         this.isToggled = !this.isToggled;


                     }}
                     onMouseMove={(e)=>this.setMargin(e)}

                >
                    <div id={"cont"}>
                        <span>
                            <div style={{width: "30px", height: "30px"}}>

                                <svg id="arrows" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                     viewBox="0 0 24 24">
                                    <path
                                        d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z"/>
                                </svg>

                            </div>
                        </span>
                    </div>
                </div>
                <div
                    id="personPanelDiv"
                    style={{
                        overflowY: 'scroll',
                        height: '100vh',
                        width: "100%"
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
            </div>
        )
            ;
    }
}

export default RightPanel;
