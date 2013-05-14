/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Circle(){
    this.radius = 0;
    this.lineWidth = 2;
    
    this.element = null;
    
    this.lastGlowEffects = new Array();
}

Circle.prototype = new Drawable();

Circle.prototype.hasPoints = function(mx,my){
    
    return this.element == null ? false : this.element.isPointInside(mx,my);
}

Circle.prototype.toStr = function(){
    return "X1:"+this.x1+" , Y1:"+this.y1 + " , X2:"+this.x2+" , Y2:"+this.y2;
}


Circle.prototype.update = function(){

}

Circle.prototype.destroyElement = function(){
    
    if(this.element == null)
        return;
    
    this.element.remove();
    
    this.element = null;
}

Circle.prototype.createElement = function(paper){
    
    if(this.element != null)
        return;
    this.element = paper.circle(this.x,this.y,this.radius);
    this.element.attr({
        "stroke" : this.drawColor,
        "stroke-width" : this.lineWidth
    });
}


Circle.prototype.getWidth = function(){

    return this.radius;
}

Circle.prototype.getHeight = function(){
    return this.radius;
}

Circle.prototype.setX = function(x){
    this.x = x;
    
    this.element.attr({
        "cx" : x
    });
}

Circle.prototype.setY = function(y){
    this.y = y;
    
    this.element.attr({
        "cy" : y
    });
}

Circle.prototype.setLocation = function(x,y){ 
    this.setX(x);
    this.setY(y);
}

Circle.prototype.setRadius = function(r){
    this.radius = r;
    
    this.element.attr({
        "r" : r
    });
}

Circle.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.element.attr({
        "stroke":color
    });
}

Circle.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.element.attr({
        "stroke-width":w
    });
}

Circle.prototype.hide = function(){
    this.element.hide();
    this.unglow();
}

Circle.prototype.show = function(){
    this.element.show();
}

Circle.prototype.applyAttr = function(a){
    this.element.attr(a);
}

Circle.prototype.getAttr = function(a){
    return this.element.attr(a);
}

Circle.prototype.animate = function(anim,time){
    
    this.element.animate(anim,time);
}

Circle.prototype.animate = function(anim,time,easing){
    
    this.element.animate(anim,time,easing);
}

Circle.prototype.animate = function(anim,time,easing,callback){
    
    this.element.animate(anim,time,easing,callback);
}

Circle.prototype.glow = function(attr){
    this.lastGlowEffects.push(this.element.glow(attr));
}

Circle.prototype.unglow = function(){
    
    for (var i = 0; i < this.lastGlowEffects.length; i++) {
    
        if(this.lastGlowEffects[i] == null)
            continue;
    
        for (var j  = 0; j < this.lastGlowEffects[i].length; j++) {
            this.lastGlowEffects[i][j].remove();
        }
        
    }
    
    this.lastGlowEffects.splice(0, this.lastGlowEffects.lenght);
}

Circle.prototype.toSvg = function(){
    var svg = raphaelToSvg(this.element.node) + '\r\n';
    return svg;
}

Circle.prototype.refresh = function(){
    this.x = this.getAttr("cx");
    this.y = this.getAttr("cy");
    this.lineWidth = this.getAttr("stroke-width");
    this.width = this.getAttr("width");
    this.height = this.getAttr("height");
    this.radius = this.getAttr("r");
    this.drawColor = this.getAttr("stroke");
}