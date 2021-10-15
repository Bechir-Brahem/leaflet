import {popupText} from "./Helper";
import L from "leaflet"

export class Position {
    constructor(pos) {
        this.lt = pos.lt
        this.lg = pos.lg
        this.date = pos.da
        this.time = pos.ti
        this.id = pos.id
        this.tm= pos.tm==="DIs";
        this.interval=-1;
    }

    getMarker(problem, name, icons) {
        return L.marker([this.lt, this.lg], {
            icon: (problem || this.tm) ? icons[1] : icons[0],
            riseOnHover: true,
            zIndexOffset: (this.tm)? 100 : 0
        }).bindPopup(popupText(this, name))

    }


}




