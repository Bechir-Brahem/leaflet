import {useMap} from "react-leaflet";
import React from "react";

function myLayers()
{
    const map =useMap();
    console.log(map.getCenter())
    return <div/>

}
export default myLayers;
