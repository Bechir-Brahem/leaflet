import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import React, {Component} from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../css/styles.css'



//default icons fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: '/static/images/marker-icon.png',
    iconRetinaUrl:'/static/images/marker-icon-2x.png',
    shadowUrl:'/static/images/marker-shadow.png'
});

let position = [36, 10.5];

class Map extends Component {
    render() {
        return (
            <MapContainer center={position} zoom={8} >
                <TileLayer
                    url={"https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"}
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        )
    }
}

export default Map;