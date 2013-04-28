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
    
    this.element = null;
}

Line.prototype = new Drawable();

Line.prototype.hasPoints = function(mx,my){
    
    return this.element == null ? false : this.element.isPointInside(mx,my);
}

Line.prototype.toStr = function(){
    return "X1:"+this.x1+" , Y1:"+this.y1 + " , X2:"+this.x2+" , Y2:"+this.y2;
}


Line.prototype.update = function(){
    
    var path = "M" + this.x1 + " " + this.y1 + "L" + this.x2 + " " + this.y2;
    
    this.element.attr({
        "path":path
    });
}

Line.prototype.destroyElement = function(){
    
    if(this.element == null)
        return;
    
    this.element.remove();
    
    this.element = null;
}

Line.prototype.createElement = function(paper){
    
    if(this.element != null)
        return;
    this.element = paper.path("M" + this.x1 + " " + this.y1 + "L" + this.x2 + " " + this.y2);
    this.element.attr({
        "stroke" : this.drawColor,
        "stroke-width" : this.lineWidth
    });
}


Line.prototype.getWidth = function(){

    return this.x2 - this.x1;
}

Line.prototype.getHeight = function(){
    return this.lineWidth;
}

Line.prototype.setX1 = function(x){
    this.x1 = x;
}

Line.prototype.setY1 = function(y){
    this.y1 = y;
}

Line.prototype.setX2 = function(x){
    this.x2 = x;
}

Line.prototype.setY2 = function(y){
    this.y2 = y;
}

Line.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.element.attr({
        "stroke":color
    });
}

Line.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.element.attr({
        "stroke-width":w
    });
}

Line.prototype.hide = function(){
    this.element.hide();
}

Line.prototype.show = function(){
    this.element.show();
}

Line.prototype.applyAttr = function(a){
    this.element.attr(a);
}

Line.prototype.getAttr = function(a){
    return this.element.attr(a);
}
