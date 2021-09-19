
class PersonInfo{
    constructor(n="",shown=true,start="",end="") {
        this.name=n;
        this.infractions=[];
        this.sos=[];
        this.isShown=shown;
        this.startDate=start;
        this.endDate=end;
    }

}
export default PersonInfo;