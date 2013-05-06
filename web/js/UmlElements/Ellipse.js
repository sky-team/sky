/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Ellipse(){
    this.width = 0;
    this.height = 0;
    this.lineWidth = 2;
    
    this.element = null;
    
    this.lastGlowEffects = new Array();
}

Ellipse.prototype = new Drawable();

Ellipse.prototype.hasPoints = function(mx,my){
    
    return this.element == null ? false : this.element.isPointInside(mx,my);
}

Ellipse.prototype.toStr = function(){
    return "X1:"+this.x1+" , Y1:"+this.y1 + " , X2:"+this.x2+" , Y2:"+this.y2;
}


Ellipse.prototype.update = function(){

}

Ellipse.prototype.destroyElement = function(){
    
    if(this.element == null)
        return;
    
    this.element.remove();
    
    this.element = null;
}

Ellipse.prototype.createElement = function(paper){
    
    if(this.element != null)
        return;
    this.element = paper.ellipse(this.x, this.y, this.width, this.height);
    this.element.attr({
        "stroke" : this.drawColor,
        "stroke-width" : this.lineWidth
    });
}


Ellipse.prototype.getWidth = function(){

    return this.width;
}

Ellipse.prototype.getHeight = function(){
    return this.height;
}

Ellipse.prototype.setX = function(x){
    this.x = x;
    
    this.element.attr({
        "cx" : x
    });
}

Ellipse.prototype.setY = function(y){
    this.y = y;
    
    this.element.attr({
        "cy" : y
    });
}

Ellipse.prototype.setLocation = function(x,y){ 
    this.setX(x);
    this.setY(y);
}

Ellipse.prototype.setWidth = function(w){
    this.width = w;
    
    this.element.attr({
        "rx":w
    });
}

Ellipse.prototype.setHeight = function(h){
    this.height = h;
    
    this.element.attr({
        "ry":h
    });
}

Ellipse.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.element.attr({
        "stroke":color
    });
}

Ellipse.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.element.attr({
        "stroke-width":w
    });
}

Ellipse.prototype.hide = function(){
    this.element.hide();
}

Ellipse.prototype.show = function(){
    this.element.show();
}

Ellipse.prototype.applyAttr = function(a){
    this.element.attr(a);
}

Ellipse.prototype.getAttr = function(a){
    return this.element.attr(a);
}

Ellipse.prototype.animate = function(anim,time){
    
    this.element.animate(anim,time);
}

Ellipse.prototype.animate = function(anim,time,easing){
    
    this.element.animate(anim,time,easing);
}

Ellipse.prototype.animate = function(anim,time,easing,callback){
    
    this.element.animate(anim,time,easing,callback);
}

Ellipse.prototype.glow = function(attr){
    this.lastGlowEffects.push(this.element.glow(attr));
}

Ellipse.prototype.unglow = function(){
    
    for (var i = 0; i < this.lastGlowEffects.length; i++) {
    
        if(this.lastGlowEffects[i] == null)
            continue;
    
        for (var j  = 0; j < this.lastGlowEffects[i].length; j++) {
            this.lastGlowEffects[i][j].remove();
        }
        
    }
    
    this.lastGlowEffects.splice(0, this.lastGlowEffects.lenght);
}

Ellipse.prototype.toSvg = function(){
    var svg = raphaelToSvg(this.element.node) + '\r\n';
    return svg;
}

Ellipse.prototype.refresh = function(){
    this.x = this.getAttr("x");
    this.y = this.getAttr("y");
    this.lineWidth = this.getAttr("stroke-width");
    this.width = this.getAttr("width");
    this.height = this.getAttr("height");
}