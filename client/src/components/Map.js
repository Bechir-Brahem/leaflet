import {MapContainer, TileLayer,} from "react-leaflet";
import React, {Component} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/styles.css";

//default icons fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "/static/images/marker-icon.png",
    iconRetinaUrl: "/static/images/marker-icon-2x.png",
    shadowUrl: "/static/images/marker-shadow.png",
});

let center = [36.08851338894426, 10.80333970970808];

class Map extends Component {


    render() {

        console.log("start render Map", Date.now())

        return (
            <MapContainer center={center} zoom={7.8}>
                <TileLayer
                    url={
                        "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                    }
                />
                {Object.values(this.props.people).map(person => this.props.peopleState[person.name].isShown ? person.getLayerGroup() : null)}
            </MapContainer>
        );

    }
}

export default Map;
