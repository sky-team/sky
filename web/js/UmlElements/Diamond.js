function Diamond(){
    this.width = 0;
    this.height = 0;
 
    this.lineWidth = 2;
    
    this.element = null;
    
    this.lastGlowEffects = new Array();
    
    this.direction = 0;
    
    this.conx = 0;
    this.cony = 0;
    
    this.type="";
}

Diamond.prototype = new Drawable();

Diamond.prototype.hasPoints = function(mx,my){
    return this.element == null ? false : this.element.isPointInside(mx,my);
}

Diamond.prototype.toStr = function(){
    return "X:"+this.x+" , Y:"+this.y + " , Width:"+this.width+" , Height:"+this.height;
}

Diamond.prototype.getPath = function(){
    var path1,path2,path3,path4;
    switch(this.direction){
        case 0:
            path1 = "M" + this.x + " " + this.y + "L" + (this.x + this.width/2) + " " + (this.y - this.height/2);
            path2 = "M" + (this.x + this.width/2) + " " + (this.y - this.height/2) + "L" + (this.x + this.width) + " " + (this.y);
            path3 = "M" + (this.x + this.width) + " " + (this.y) + "L" + (this.x + this.width/2) + " " + (this.y + this.height/2);
            path4 = "M" + (this.x + this.width/2) + " " + (this.y + this.height/2) + "L" + (this.x) + " " + (this.y);
            this.conx = this.x + this.width;
            this.cony = this.y;
            break;
        case 2:
            path1 = "M" + this.x + " " + this.y + "L" + (this.x - this.width/2) + " " + (this.y - this.height/2);
            path2 = "M" + (this.x - this.width/2) + " " + (this.y - this.height/2) + "L" + (this.x - this.width) + " " + (this.y);
            path3 = "M" + (this.x - this.width) + " " + (this.y) + "L" + (this.x - this.width/2) + " " + (this.y + this.height/2);
            path4 = "M" + (this.x - this.width/2) + " " + (this.y + this.height/2) + "L" + (this.x) + " " + (this.y);
            this.conx = this.x - this.width;
            this.cony = this.y;
            break;
        case 1:
            path1 = "M" + this.x + " " + this.y + "L" + (this.x - this.width/2) + " " + (this.y + this.height/2);
            path2 = "M" + (this.x - this.width/2) + " " + (this.y + this.height/2) + "L" + (this.x) + " " + (this.y + this.height);
            path3 = "M" + (this.x) + " " + (this.y + this.height) + "L" + (this.x + this.width/2) + " " + (this.y + this.height/2);
            path4 = "M" + (this.x + this.width/2) + " " + (this.y + this.height/2) + "L" + (this.x) + " " + (this.y);
            this.conx = this.x;
            this.cony = this.y + this.height;
            break;
        case 3:
            path1 = "M" + this.x + " " + this.y + "L" + (this.x - this.width/2) + " " + (this.y - this.height/2);
            path2 = "M" + (this.x - this.width/2) + " " + (this.y - this.height/2) + "L" + (this.x) + " " + (this.y - this.height);
            path3 = "M" + (this.x) + " " + (this.y - this.height) + "L" + (this.x + this.width/2) + " " + (this.y - this.height/2);
            path4 = "M" + (this.x + this.width/2) + " " + (this.y - this.height/2) + "L" + (this.x) + " " + (this.y);
            this.conx = this.x;
            this.cony = this.y - this.height;
            break;
    }
    
    return path1 + path2 + path3 + path4;
}

Diamond.prototype.update = function(){
    var path = this.getPath();
    
    this.element.attr({
        "path":path
    });
}

Diamond.prototype.destroyElement = function(){
    if(this.element == null)
        return;
    
    this.element.remove();
    
    this.element = null;
}

Diamond.prototype.createElement = function(paper){
    if(this.element != null)
        return;
    this.element = paper.path(this.getPath());
    this.element.attr({
        "stroke" : this.drawColor,
        "stroke-width" : this.lineWidth
    });
}


Diamond.prototype.getWidth = function(){
    return this.width;
}

Diamond.prototype.getHeight = function(){
    return this.height;
}

Diamond.prototype.setX = function(x){
    this.x = x;
}

Diamond.prototype.setY = function(y){
    this.y = y;
}

Diamond.prototype.setWidth = function(w){
    this.width = w;
}

Diamond.prototype.setHeight = function(h){
    this.height = h;
}

Diamond.prototype.setDrawColor = function(color){
    this.drawColor = color;
    
    this.element.attr({
        "stroke":color
    });
}

Diamond.prototype.setLineWidth = function(w){
    this.lineWidth = w;
    
    this.element.attr({
        "stroke-width":w
    });
}

Diamond.prototype.hide = function(){
    this.element.hide();
}

Diamond.prototype.show = function(){
    this.element.show();
}

Diamond.prototype.applyAttr = function(a){
    this.element.attr(a);
}

Diamond.prototype.getAttr = function(a){
    return this.element.attr(a);
}

Diamond.prototype.animate = function(anim,time){
    
    this.head.animate(anim,time);
}

Diamond.prototype.animate = function(anim,time,easing){
    
    this.element.animate(anim,time,easing);
}

Diamond.prototype.animate = function(anim,time,easing,callback){
    
    this.element.animate(anim,time,easing,callback);
}

Diamond.prototype.glow = function(attr){
    this.lastGlowEffects.push(this.element.glow(attr));
}

Diamond.prototype.unglow = function(){
    
    for (var i = 0; i < this.lastGlowEffects.length; i++) {
    
        if(this.lastGlowEffects[i] == null)
            continue;
    
        for (var j  = 0; j < this.lastGlowEffects[i].length; j++) {
            this.lastGlowEffects[i][j].remove();
        }
        
    }
    
    this.lastGlowEffects.splice(0, this.lastGlowEffects.lenght);
}

Diamond.prototype.toSvg = function(){
    var svg = raphaelToSvg(this.element.node) + '\r\n';

    return svg;
}

Diamond.prototype.refresh = function(){
    this.x = this.getAttr("x");
    this.y = this.getAttr("y");
    this.lineWidth = this.getAttr("stroke-width");
    this.width = this.getAttr("width");
    this.height = this.getAttr("height");
}

Diamond.prototype.getType = function(){
    return this.type; 
}