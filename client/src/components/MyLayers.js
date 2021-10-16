import {useMap} from "react-leaflet";



function MyLayers(props) {
    const map = useMap();
    Object.values(props.people).forEach(person => {

        //TODO:check for changed boats only
        if (props.peopleState[person.name].isShown) {
                person.draw(map,props.peopleState[person.name]);
        }
    })
    return null

}

export default MyLayers;
