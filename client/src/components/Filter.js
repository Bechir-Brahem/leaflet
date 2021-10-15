import {Form} from "react-bootstrap";
import {Component} from "react";

class Filter extends Component {
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
                    <strong>Date Filter:</strong>
                    <br/>
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
        );
    }
}

export default Filter;
