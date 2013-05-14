/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Line(){
    this.x1 = 0;
    this.y1 = 0;
    
    this.x2 = 0;
    this.y2 = 0;
    
    this.title = new Text("");
    
    this.fontSize = 12;
    this.fontFamily = "Arial";
    
    this.lineWidth = 2;
    
    this.effects = new Array();
    
    this.element = null;
    
    this.lastGlowEffects = new Array();
    
    this.textLocationStyle = 1;
    this.autoRotation = false;
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
    
    switch(this.textLocationStyle){
        case 0:
            this.title.setX(Math.min(this.x2,this.x1));
            break;
        case 1:
            this.title.setX(Math.min(this.x2,this.x1) + (Math.abs(this.x2 - this.x1) / 2 - this.title.getWidth() / 2));
            break;
        case 0:
            this.title.setX(Math.max(this.x2,this.x1) - this.title.getWidth());
            break;
    }
    
    if(this.autoRotation){   
        
    }else{
        this.title.setY(Math.min(this.y1,this.y2) - this.title.getHeight() - this.fontSize + Math.abs(this.y1-this.y2)/2);
    }

    this.title.update();
}

Line.prototype.destroyElement = function(){
    
    if(this.element == null)
        return;
    
    this.element.remove();
    this.title.destroyElement();
    
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
    
    this.title.createElement(paper);
}


Line.prototype.getWidth = function(){

    return Math.abs(this.x2 - this.x1);
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
    
    this.title.setDrawColor(color);
}

Line.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.element.attr({
        "stroke-width":w
    });
}

Line.prototype.setTitle= function(title){
    this.title.setText(title);
}

Line.prototype.setFontSize = function(size){
    this.fontSize = size;
    this.title.setFontSize(this.fontSize);
}

Line.prototype.setFontFamily = function(fontFamily){
    this.fontFamily = fontFamily;
    this.title.setFontFamily(this.fontFamily);
}

Line.prototype.hide = function(){
    this.element.hide();
    this.title.hide();
    this.unglow();
}

Line.prototype.show = function(){
    this.element.show();
    this.title.show();
    
}

Line.prototype.applyAttr = function(a){
    this.element.attr(a);
}

Line.prototype.getAttr = function(a){
    return this.element.attr(a);
}

Line.prototype.animate = function(anim,time){
    
    this.head.animate(anim,time);
}

Line.prototype.animate = function(anim,time,easing){
    
    this.element.animate(anim,time,easing);
}

Line.prototype.animate = function(anim,time,easing,callback){
    
    this.element.animate(anim,time,easing,callback);
}

Line.prototype.glow = function(attr){
    this.lastGlowEffects.push(this.element.glow(attr));
}

Line.prototype.unglow = function(){
    
    for (var i = 0; i < this.lastGlowEffects.length; i++) {
    
        if(this.lastGlowEffects[i] == null)
            continue;
    
        for (var j  = 0; j < this.lastGlowEffects[i].length; j++) {
            this.lastGlowEffects[i][j].remove();
        }
        
    }
    
    this.lastGlowEffects.splice(0, this.lastGlowEffects.lenght);
}

Line.prototype.toSvg = function(){
    var svg = raphaelToSvg(this.element.node) + '\r\n';
    svg += this.title.toSvg();

    return svg;
}

Line.prototype.refresh = function(){
    this.lineWidth = this.getAttr("stroke-width");
    this.width = this.getAttr("width");
    this.height = this.getAttr("height");
    this.drawColor = this.getAttr("stroke");
    
    this.text.refresh();
}

Line.prototype.getTitle = function(){
    return this.title.getText();
}