import {Form} from "react-bootstrap";
import {Component} from "react";

class Filter extends Component {
    render() {
        return (
            <div>

                <div style={{display: "flex"}}>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={this.props.isChecked}
                        onChange={() => {
                            this.props.togglePerson(this.props.name);
                        }}
                    />
                    <span>{this.props.name}</span>
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
                            onChange={(e) => this.props.setDate(this.props.name,0,e.target.value)}
                        />
                    </span>
                    <span style={{marginLeft: "10px"}}> to:
                        <input
                            type="date"
                            onChange={(e) => this.props.setDate(this.props.name,1,e.target.value)}
                            placeholder={"dd-mm-yyyy"}
                        />
                    </span>
                </div>
            </div>
        );
    }
}

export default Filter;
