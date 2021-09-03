class Person{
    constructor() {
        this.name="";
        this.drawen=false;
        this.markers=[];
        this.layerGroup=null;
        /**
         *boats array of positions,name,id,LT,LG
         *    [{ID:2581,NA:'El_Mouhib',TM:'POS',LT:'37.47360',LG:'10.70204',DA:'20210901',TI:'1153'},
         *    {ID:2580,NA:'El_Mouhib',TM:'POS',LT:'37.50935',LG:'10.73007',DA:'20210901',TI:'1053'}],
         *    [{ID:2577,NA:'Amira_Najah',TM:'POS',LT:'35.23176',LG:'11.16225',DA:'20210901',TI:'0805'}]
         */
        this.boats=[];
    }
    draw()
    {
        if(!this.drawen)
        {
            this.boats.forEach(position=>{
                let coordinates = [position.LT, position.LG];
                let tmp = L.marker(coordinates, {icon: boatIcon, title: 'boat'})
                    .bindPopup(popupText(position));
                this.markers.push(tmp);

            })
            this.layerGroup=L.layerGroup(this.markers);
            this.layerGroup.addTo(mymap);
            this.drawen =true;

        }
    }
    unDraw(){
        if(this.drawen)
        {
            this.layerGroup.remove();
            this.drawen=false;
        }

    }
    toggle(){
        if(this.drawen)this.unDraw();
        else this.draw();
    }
}
