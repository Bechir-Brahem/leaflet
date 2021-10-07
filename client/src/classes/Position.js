import React from "react";
import {popupText} from "./Helper";
import L from "leaflet"

export class Position {
    constructor(pos) {
        this.lt = pos.lt
        this.lg = pos.lg
        this.date = pos.da
        this.time = pos.ti
        this.id = pos.id
    }

    getMarker(problem, name, icons) {
        return L.marker([this.lt, this.lg], {
            icon: problem ? icons[1] : icons[0],
            riseOnHover: true
        }).bindPopup(popupText(this, name))

    }


}




