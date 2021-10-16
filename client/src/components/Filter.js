import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Form} from "react-bootstrap";
import {Component} from "react";
import {
    faCarBattery,
    faMicrochip,
    faPlug,
    faThermometerEmpty,
    faThermometerFull,
    faThermometerHalf,
    faThermometerQuarter,
    faThermometerThreeQuarters
} from '@fortawesome/free-solid-svg-icons'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
class Filter extends Component {
    temp;
    thermIcon;
    voltage;
    tempSys;

    constructor(props) {
        super(props);
        this.temp = getRandomInt(100);
        this.thermIcon = faThermometerThreeQuarters;
        if (this.temp > 80)
            this.thermIcon = faThermometerFull;
        else if (this.temp > 60)
            this.thermIcon = faThermometerThreeQuarters;
        else if (this.temp > 40)
            this.thermIcon = faThermometerHalf;
        else if (this.temp > 20)
            this.thermIcon = faThermometerQuarter;
        else
            this.thermIcon = faThermometerEmpty;

        this.voltage=(getRandomInt(15)+20+Math.random()).toPrecision(4)
        this.tempSys=getRandomInt(70);

    }
    render() {

        return (
            <div>

                <span>{this.props.name}</span>
                <div>
                    <div style={{display: "flex"}}>
                        <Form.Check
                            type="switch"
                            checked={this.props.isShown}
                            onChange={() => {
                                this.props.togglePerson(this.props.name);
                            }}/>
                        <span>show</span>
                    </div>
                    <div style={{display: "flex"}}>
                        <Form.Check
                            type="switch"
                            checked={this.props.isAllPos}
                            disabled={!this.props.isShown}
                            onChange={() => {
                                this.props.toggleAllPos(this.props.name);
                            }}/>
                        <span>all pos ({this.props.posCount})</span>
                    </div>

                </div>

                <hr style={{width: "25%"}}/>

                <div style={{
                    marginTop: "5px",
                    marginBottom: "10px"
                }}>
                    <strong style={{paddingBottom: "10px"}}>Date Filter:</strong>
                    <br/>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <span> from:
                        <input
                            type="date"
                            onChange={(e) => this.props.setDate(this.props.name, 0, e.target.value)}
                            value={(this.props.startDate).yyyymmdd()}
                        />
                    </span>
                        <span style={{marginLeft: "10px"}}> to:
                        <input
                            type="date"
                            onChange={(e) => this.props.setDate(this.props.name, 1, e.target.value)}
                            value={(this.props.endDate).yyyymmdd()}
                        />
                    </span>
                    </div>
                </div>

                <div style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
                    <div>
                        <FontAwesomeIcon icon={this.thermIcon} size="2x"/>
                        <span style={{marginRight: "10px"}}/>
                        {this.temp}°C
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faMicrochip} size="2x"/>
                        <span style={{marginRight: "10px"}}/>
                        {this.tempSys}°C
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCarBattery} size="2x"/>
                        <span style={{marginRight: "10px"}}/>
                        Full : {this.voltage} V
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faPlug} size="2x"/>
                        <span style={{marginRight: "10px"}}/>
                        charging...

                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
