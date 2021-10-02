import React from 'react';
import {Accordion, Table} from "react-bootstrap";

function Info(props) {
    let list = props.problems.map((key,index) => {
        return <tr>
            <td>{index}</td>
            <td>{key[0].DA}</td>
            <td>({key[0].LT} , {key[0].LG})</td>
            <td>{key[1].DA}</td>
            <td>({key[1].LT} , {key[1].LG})</td>
        </tr>
    })


    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Infractions</Accordion.Header>
                <Accordion.Body>
                    <Table striped bordered hover >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>time</th>
                            <th>position</th>
                            <th>time</th>
                            <th>position</th>
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