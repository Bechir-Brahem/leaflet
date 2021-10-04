import {Marker, Popup} from "react-leaflet";
import React from "react";
import {numberToDateString, numberToTimeString} from "./Helper";

export class Position {
    constructor(pos) {
        this.lt = pos.lt
        this.lg = pos.lg
        this.date = pos.da
        this.time = pos.ti
        this.id = pos.id
    }

    getMarker(problem, name, icons) {
        return (

            <Marker
                key={this.id+name}
                position={[this.lt, this.lg]}
                icon={problem ? icons[1] : icons[0]}
                riseOnHover={true}
            >
                <Popup>
                    {this.popupText(name)}
                </Popup>
            </Marker>
        )
    }

    popupText(name) {
        return (
            <span>
            <center>{name}</center>
            ({this.lt} , {this.lg}) <br/>
            at {numberToDateString(this.date)} {numberToTimeString(this.time)}
        </span>
        )


    }

}




