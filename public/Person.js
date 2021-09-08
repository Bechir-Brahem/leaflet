class Person {
    constructor() {
        this.name = "";
        this.drawen = false;
        this.color = "";
        this.markers = [];
        this.layerGroup = null;
        this.startDate = 0;
        this.endDate = Number.MAX_SAFE_INTEGER;
        /**
         *boats array of positions,name,id,LT,LG
         *    [{ID:2581,NA:'El_Mouhib',TM:'POS',LT:'37.47360',LG:'10.70204',DA:'20210901',TI:'1153'},
         *    {ID:2580,NA:'El_Mouhib',TM:'POS',LT:'37.50935',LG:'10.73007',DA:'20210901',TI:'1053'}],
         *    [{ID:2577,NA:'Amira_Najah',TM:'POS',LT:'35.23176',LG:'11.16225',DA:'20210901',TI:'0805'}]
         */
        this.boats = [];
        this.problems = [];
    }

    draw() {

        if (!this.drawen) {
            let polylinePoints = [];
            var boatIcon = generateBoatIcon(this.color);
            var redBoatIcon=generateBoatIcon("red","red")
            let last_pos = {};
            let problem = false;
            this.layerGroup = L.layerGroup();
            this.boats.forEach((position, index) => {
                problem = false;
                //check date filter
                let intDate = parseInt(position.DA);
                if (intDate >= this.startDate && intDate <= this.endDate) {
                    let coordinates = [position.LT, position.LG];



                    if (index !== 0) {
                        if (last_pos.DA === position.DA) {
                            if (position.TI - last_pos.TI > 200) problem = true;
                        } else {
                            //TODO: check the date
                            //this code returns a wrong value if we are on different dates (more than one day)
                            //and the difference between times is 100 (1 hour)
                            if (("2400" - last_pos.TI) + parseInt(position.TI) > 200) problem = true;
                        }
                    }

                    if (problem) {
                        //TODO: store only values in problems and make a function that generates the error to save space
                        this.problems.push("time difference between positions is more than two hours for " + this.name +
                        "'s boat from  "+  numberToDateString(last_pos.DA)+" "+numberToTimeString(last_pos.TI)+" (" + last_pos.LT +","+last_pos.LG+ ")"+
                        " to "+ numberToDateString(position.DA)+" "+numberToTimeString(position.TI)+" (" + coordinates + ")");
                        this.layerGroup.addLayer(L.polyline(polylinePoints, {color: colors.shadeHexColor(this.color, -0.4)}));
                        polylinePoints = [[last_pos.LT, last_pos.LG], coordinates];
                        this.layerGroup.addLayer(
                            L.polyline(polylinePoints, {
                            color: 'red',
                            dashArray: '20,20'
                        }).bindPopup(this.name+" " +numberToDateString(last_pos.DA)+" "+numberToTimeString(last_pos.TI)+" => "+
                                numberToDateString(position.DA)+" "+numberToTimeString(position.TI)
                            )
                        );
                        polylinePoints = [];


                    }
                    let tmp = L.marker(coordinates, {
                        icon: problem?redBoatIcon:boatIcon,
                        title: position.NA,
                        riseOnHover:true,
                        zIndexOffset:problem?20:0
                    })
                        .bindPopup(popupText(position));


                    polylinePoints.push(coordinates);
                    this.markers.push(tmp);
                    last_pos = position;
                }
            });
            if (polylinePoints.length > 1) {
                this.layerGroup.addLayer(L.polyline(polylinePoints, {color: colors.shadeHexColor(this.color, -0.4)}));
            }
            this.layerGroup.addLayer(L.layerGroup(this.markers))
            this.layerGroup.addTo(mymap);
            this.drawen = true;

        }
    }

    reDraw() {
        this.unDraw();
        this.draw();
    }

    unDraw() {
        if (this.drawen) {
            this.markers = [];
            this.layerGroup.remove();
            this.drawen = false;
        }

    }

    toggle() {

        if (this.drawen) this.unDraw();
        else this.draw();
    }

    sortByDate() {
        this.boats.sort((a, b) => {
            if (a.DA - b.DA === 0) {
                return a.TI - b.TI;
            }
            return a.DA - b.DA;

        })
    }
}
