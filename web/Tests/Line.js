/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Line(){
    this.x1 = 0;
    this.y1 = 0;
    
    this.x2 = 0;
    this.y2 = 0;
    
    this.lineWidth = 2;
    
    this.effects = new Array();
}

Line.prototype = new Drawable();

Line.prototype.setup = function(ctx){
    
}

Line.prototype.hasPoints = function(mx,my){
    
    var f = function(somex) { return (this.y2 - this.y1) / (this.x2 - this.x1) * (somex - this.x1) + this.y1; };
    return Math.abs(f(mx) - my) < 1e-6 // tolerance, rounding errors
        && mx >= this.y1 && mx <= this.x2;
    
    /*if(this.x1 == this.x2)
        return false;
    
    var slope = (this.y1-this.y2) / (this.x2-this.x1);
    var yintersect = (slope*-1) * this.x1 / this.y1;
    
    return my == slope * mx + yintersect;*/
}

Line.prototype.draw = function(ctx){

    for(var i = 0 ; i < this.effects.length ;i++){
        this.effects[i].startEffects(ctx);
    }

    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.drawColor;
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();
    
    for(var i = 0 ; i < this.effects.length ;i++){
        this.effects[i].startEffects(ctx);
    }
}

Line.prototype.clear = function(ctx){
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.clearColor;
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();
}

Line.prototype.toStr = function(){
    return "X1:"+this.x1+" , Y1:"+this.y1 + " , X2:"+this.x2+" , Y2:"+this.y2;
}
