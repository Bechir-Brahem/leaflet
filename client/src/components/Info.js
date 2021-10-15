import React from 'react';
import {numberToDateString, numberToTimeString} from "../classes/Helper";
import {Accordion, Table} from "react-bootstrap";

function Info(props) {
    let problemList = props.problems.map((key, index) => {
        return (
            <tr key={key[0].id + key[1].id}>
                <td>{index + 1}</td>
                <td>{numberToDateString(key[0].date)} {numberToTimeString(key[0].time)}< /td>
                <td>({key[0].lt} , {key[0].lg})</td>
                <td>{numberToDateString(key[1].date)} {numberToTimeString(key[1].time)}</td>
                <td>({key[1].lt} , {key[1].lg})</td>
            </tr>
        )
    })
    let sosList = props.sos.map((pos, index) => {
        return (<tr key={pos.id}>
            <td>{index + 1}</td>
            <td>{numberToDateString(pos.date)} {numberToTimeString(pos.time)}< /td>
            <td>({pos.lt} , {pos.lg})</td>
        </tr>)

    })


    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Infractions ({problemList.length})</Accordion.Header>
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
                        {problemList}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>SOS ({sosList.length})</Accordion.Header>
                <Accordion.Body>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>time</th>
                            <th>position</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sosList}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )

}

export default Info;