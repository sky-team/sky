/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Triangle(){
    this.line1 = new Line();
    this.line2 = new Line();
    this.line3 = new Line();
    
    this.x = 0;
    this.y = 0;
    
    this.size = 0;
    
    this.rotation = 0;
    this.direction = "left";
    this.drawColor = "Black";
    this.clearColor = "white";
}

Triangle.prototype.hasPoints = new function(mx,my){
    return false;
}

Triangle.prototype.setup  = function(ctx){
    this.line1.x1 = this.x;
    this.line1.y1 = this.y;
    this.line1.x2 = this.x + (this.size - this.rotation);
    this.line1.y2 = this.y - (this.size - this.rotation);
    
    this.line2.x1 = this.x;
    this.line2.y1 = this.y;
    this.line2.x2 = this.x + (this.size - this.rotation);
    this.line2.y2 = this.y + (this.size - this.rotation);
    
    this.line3.x1 = this.line1.x2;
    this.line3.y1 = this.line1.y2;
    this.line3.x2 = this.line2.x2;
    this.line3.y2 = this.line2.y2;
    
    this.line1.drawColor = this.drawColor;
    this.line2.drawColor = this.drawColor;
    this.line3.drawColor = this.drawColor;
    
    this.line1.clearColor = this.clearColor;
    this.line2.clearColor = this.clearColor;
    this.line3.clearColor = this.clearColor;
}

Triangle.prototype.draw = function(ctx){
    //this.setup(ctx);
    this.line1.draw(ctx);
    this.line2.draw(ctx);
    this.line3.draw(ctx);
}

Triangle.prototype.clear = function(ctx){
    //this.setup(ctx);
    this.line1.clear(ctx);
    this.line2.clear(ctx);
    this.line3.clear(ctx);
}