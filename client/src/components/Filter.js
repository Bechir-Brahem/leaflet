import { Form } from "react-bootstrap";

import { Component } from "react";

class Filter extends Component {
    render() {
        return (
            <Form.Check
                type="switch"
                id="custom-switch"
                checked={this.props.isChecked}
                onChange={() => {
                    this.props.togglePerson(this.props.name);
                }}
            />
        );
    }
}

export default Filter;
