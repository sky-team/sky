/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Line(){
    this.x1 = 0;
    this.y1 = 0;
    
    this.x2 = 0;
    this.y2 = 0;

    this.drawColor = "black";
    this.clearColor = "white";
}

Line.prototype.hasPoints = function(mx,my){
    
    if(this.x1 == this.x2)
        return false;
    
    var slope = (this.y1-this.y2) / (this.x2-this.x1);
    var yintersect = (slope*-1) * this.x1 / this.y1;
    
    return my == slope * mx + yintersect;
}

Line.prototype.draw = function(ctx){
    
    ctx.strokeStyle= this.drawColor;
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();
}

Line.prototype.clear = function(ctx){
    ctx.strokeStyle = this.clearColor;
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();
}

Line.prototype.toStr = function(){
    return "X1:"+this.x1+" , Y1:"+this.y1 + " , X2:"+this.x2+" , Y2:"+this.y2;
}
