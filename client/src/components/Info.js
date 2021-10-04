import React from 'react';
import {numberToDateString, numberToTimeString} from "../classes/Helper";
import {Accordion, Table} from "react-bootstrap";
function Info(props) {
    let list = props.problems.map((key, index) => {
        return (
            <tr key={key[0].id+key[1].id}>
                <td>{index+1}</td>
                <td>{numberToDateString(key[0].date)} {numberToTimeString(key[0].time)}< /td>
                <td>({key[0].lt} , {key[0].lg})</td>
                <td>{numberToDateString(key[1].date)} {numberToTimeString(key[1].time)}</td>
                <td>({key[1].lt} , {key[1].lg})</td>
            </tr>
        )
    })


    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Infractions ({list.length})</Accordion.Header>
                <Accordion.Body>
                    <Table striped bordered hover>
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