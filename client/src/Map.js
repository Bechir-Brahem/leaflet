import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import React, {Component} from 'react';
// import  mapStyle from './css/styles.css';

var position=[36, 10.5];

const mapStyle={
    width:"500px"
}
class Map extends Component {
    render() {
        return (
            <MapContainer style={mapStyle} center={position} zoom={8} scrollWheelZoom={false}>
                <TileLayer
                    url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}'
                    minZoom="1"
                    maxZoom= "16"
                    ext= 'jpg'
                    />
            </MapContainer>
        )
    }
}

export default Map;