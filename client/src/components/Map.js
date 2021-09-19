import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import React, {Component} from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../css/styles.css'
import {generateBoatIcon, popupText} from '../classes/Helper'


//default icons fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: '/static/images/marker-icon.png',
    iconRetinaUrl: '/static/images/marker-icon-2x.png',
    shadowUrl: '/static/images/marker-shadow.png'
});

let position = [36, 10.5];

class Map extends Component {

    render() {
        let markers = []
        this.props.people.forEach(person => {
            if (person.isShown) {
                person.positions.forEach((pos) => {
                    // let problem = false;
                    //check date filter
                    let intDate = parseInt(pos.DA);
                    if (intDate >= person.startDate && intDate <= person.endDate) {
                        markers.push(
                            <Marker key={pos.ID} position={[pos.LT, pos.LG]} icon={generateBoatIcon(person.color)}>
                                <Popup>
                                    <p dangerouslySetInnerHTML={{__html: popupText(pos)}}>
                                    </p>
                                </Popup>
                            </Marker>
                        )
                    }
                })
            }
        })

        return (
            <MapContainer center={position} zoom={8}>
                <TileLayer
                    url={"https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"}
                />
                {markers}
            </MapContainer>
        )
    }
}

export default Map;