import {MapContainer, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
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

let center = [36, 10.5];

class Map extends Component {
    checkProblem(position, lastPos) {
        if (lastPos.DA === position.DA) {
            if (position.TI - lastPos.TI > 200) return true;
        } else {
            //TODO: check the date
            //this code returns a wrong value if we are on different dates (more than one day)
            //and the difference between times is 100 (1 hour)
            //HINT: i can use Date object
            if (("2400" - lastPos.TI) + parseInt(position.TI) > 200) return true;
        }
    }

    render() {
        let markers = [];
        let polylines = [];
        this.props.people.forEach((person, index) => {

            if (person.isShown) {

                let boatIcon = generateBoatIcon(person.color)
                let lastPos = "";
                let tmpPolyline = [];

                person.positions.forEach((pos) => {

                    let problem = false;

                    let intDate = parseInt(pos.DA);
                    if (intDate >= person.startDate && intDate <= person.endDate) {

                        let coordinates = [pos.LT, pos.LG];
                        markers.push(
                            <Marker key={pos.ID} position={coordinates} icon={boatIcon}>
                                <Popup>
                                    <p dangerouslySetInnerHTML={{__html: popupText(pos)}}>
                                    </p>
                                </Popup>
                            </Marker>
                        )

                        if (index !== 0) {
                            problem = this.checkProblem(pos, lastPos);
                        }

                        if (problem) {
                            polylines.push(<Polyline pathOptions={{color: person.color}} positions={tmpPolyline}/>)

                            tmpPolyline = [[lastPos.LT, lastPos.LG], coordinates];
                            polylines.push(<Polyline
                                pathOptions={{color: 'red', dashArray: "20,20"}}
                                positions={tmpPolyline}
                            />)
                            tmpPolyline = []

                        }


                        tmpPolyline.push(coordinates)
                        lastPos = pos;
                    }

                })
                if (tmpPolyline.length > 1)
                    polylines.push(<Polyline pathOptions={{color: person.color}} positions={tmpPolyline}/>)
            }
        })

        return (
            <MapContainer center={center} zoom={8}>
                <TileLayer
                    url={"https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"}
                />
                {markers}
                {polylines}
            </MapContainer>
        )
    }
}

export default Map;