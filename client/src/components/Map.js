import {MapContainer, TileLayer,} from "react-leaflet";
import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/styles.css";
import MyLayers from "./MyLayers";

//default icons fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "/static/images/marker-icon.png",
    iconRetinaUrl: "/static/images/marker-icon-2x.png",
    shadowUrl: "/static/images/marker-shadow.png",
});

let center = [36.08851338894426, 10.80333970970808];

function Map(props) {

    console.log("start render Map", Date.now())

    return (
        <MapContainer center={center} zoom={7.8} scrollWheelZoom={false} >
            <TileLayer
                url={
                    "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                }
            />
            <MyLayers people={props.people} peopleState={props.peopleState}/>
        </MapContainer>
    );

}

export default Map;
