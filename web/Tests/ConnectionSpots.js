/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ConnectionSpots(){
    this.XLeftSpot = 0;
    this.YLeftSpot = 0;
    
    this.XRightSpot = 0;
    this.YRightSpot = 0;    
    
    this.XTopSpot = 0;
    this.YTopSpot = 0;  
    
    this.XDownSpot = 0;
    this.YDownSpot = 0;
}

ConnectionSpots.prototype.toStr = function(){
    return "Left["+this.XLeftSpot+","+this.YLeftSpot+"] , " +
        "Right["+this.XRightSpot+","+this.YRightSpot+"] , " + 
        "Top["+this.XTopSpot+","+this.YTopSpot+"] , " + 
        "Left["+this.XDownSpot+","+this.YDownSpot+"] , ";
}

ConnectionSpots.prototype.draw = function(ctx){
    
}