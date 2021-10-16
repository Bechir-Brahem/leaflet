import {MapContainer,} from "react-leaflet";
import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/styles.css";
import MyLayers from "./MyLayers";

import "leaflet.fullscreen/Control.FullScreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import screenfull from 'screenfull';

window.screenfull = screenfull;
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
        <MapContainer
            center={center} zoom={7.8}
            // scrollWheelZoom={false}
            fullscreenControl={true}
            whenCreated={map => {
                props.setMap(map)
                L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {}).addTo(map)
                L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png").addTo(map);
                L.control.scale({imperial: false}).addTo(map);
            }}
        >
            />
            <MyLayers people={props.people} peopleState={props.peopleState}/>
        </MapContainer>
    );

}

export default Map;
