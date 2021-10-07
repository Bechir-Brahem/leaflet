import {useMap} from "react-leaflet";
import React, {useEffect} from "react";

let oldState = [];

function MyLayers(props) {
    console.log("My layers", Date.now())
    const map = useMap();



    Object.values(props.people).map(person => {

        if (props.peopleState[person.name].isShown) {
                person.getLayerGroup().addTo(map)
        }
    })
    return null

}

export default MyLayers;
