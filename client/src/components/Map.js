import {MapContainer, TileLayer,} from "react-leaflet";
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
        <MapContainer center={center} zoom={7.8} scrollWheelZoom={false}
                      whenCreated={map => {
                          L.control.fullscreen({
                              position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
                              title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
                              titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
                              content: null, // change the content of the button, can be HTML, default null
                              forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
                              forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
                              fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
                          }).addTo(map);
                          L.control.scale({imperial:false}).addTo(map);
                      }}
        >
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
