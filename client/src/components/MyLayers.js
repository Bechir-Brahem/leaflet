import {useMap} from "react-leaflet";
import L from "leaflet";



function MyLayers(props) {
    console.log("My layers", Date.now())
    const map = useMap();
    console.log(map.options)

    L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png").addTo(map);



    Object.values(props.people).forEach(person => {

        //TODO:check for changed boats only
        if (props.peopleState[person.name].isShown) {
                person.draw(map,props.peopleState[person.name]);
        }
    })
    return null

}

export default MyLayers;
