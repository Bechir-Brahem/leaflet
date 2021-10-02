import React from 'react';
import {numberToDateString, numberToTimeString} from "../classes/Helper";
import {Accordion, Table} from "react-bootstrap";

function Info(props) {
    let list = props.problems.map((key, index) => {
        return (
            <tr key={key[0].ID+key[1].ID}>
                <td>{index+1}</td>
                <td>{numberToDateString(key[0].DA)} {numberToTimeString(key[0].TI)}< /td>
                <td>({key[0].LT} , {key[0].LG})</td>
                <td>{numberToDateString(key[1].DA)} {numberToTimeString(key[1].TI)}</td>
                <td>({key[1].LT} , {key[1].LG})</td>
            </tr>
        )
    })


    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Infractions</Accordion.Header>
                <Accordion.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>time 1</th>
                            <th>position 1</th>
                            <th>time 2</th>
                            <th>position 2</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>SOS</Accordion.Header>
                <Accordion.Body>
                    abc
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )

}

export default Info;